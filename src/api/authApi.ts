import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "@/api/instances";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include'
    }),
    endpoints: (builder) => {
        return {
            checkApp: builder.query<void, void>({
                query: () => {
                    return {
                        url: ''
                    }
                }
            }),
            getMe: builder.query({
                query: () => ({
                    url:'/auth/refresh-token'
                })
            }),
            signUp: builder.mutation<void, RegisterParamsType>({
                query: (data) => {
                    return {
                        method: 'POST',
                        url: '/auth/registration',
                        body: {
                            login: data.userName,
                            password: data.password,
                            email: data.email
                        }
                    }
                }
            }),
            signUpConfirmation: builder.mutation<void, { code: string }>({
                query: (data) => ({
                    url: '/auth/registration-confirmation',
                    method: 'POST',
                    body: data,
                })
            }),
            resendEmailConfirmation: builder.mutation<void, { email: string }>({
                query: (data) => {
                    return {
                        method: 'POST',
                        url: '/auth/registration-email-resending',
                        body: {
                            email: data.email
                        }
                    }
                }
            }),
            passwordRecovery: builder.mutation<void, { email: string }>({
                query: (data) => ({
                    url: '/auth/password-recovery',
                    method: 'POST',
                    body: data
                })
            }),
            resetPassword: builder.mutation<void, { newPassword: string, recoveryCode: string }>({
                query: (data) => ({
                    url: '/auth/new-password',
                    method: 'POST',
                    body: data
                })
            }),
            login: builder.mutation<void, { login: string, password: string }>({
                query: (data) => ({
                    url: `/auth/login`,
                    method: 'POST',
                    body: data,
                })
            }),
            logout: builder.mutation<void, unknown>({
                query: () => ({
                    url: `/auth/logout`,
                    method: 'POST',
                }),
                async onQueryStarted(_, {dispatch, queryFulfilled}) {
                    const patchResult = dispatch(
                        authApi.util?.updateQueryData('getMe', undefined, () => {
                            return null
                        })
                    )
                    try {
                        await queryFulfilled
                    } catch {
                        patchResult.undo()
                    }
                }
            }),
        }
    }
})

export const {useCheckAppQuery, useSignUpMutation, useResendEmailConfirmationMutation,useGetMeQuery,useLoginMutation,useSignUpConfirmationMutation,useResetPasswordMutation,usePasswordRecoveryMutation,useLogoutMutation} = authApi

//types
export type RegisterParamsType = {
    userName: string
    email: string
    password: string
}

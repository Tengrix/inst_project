import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "@/api/instances";
import {CommonServerResponse} from "@/api/types/LoginPropsType";
import {ImageType} from "@/redux/store/imageSlice/types/store";


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
            passwordRecovery: builder.mutation<void, { email: string,recaptchaValue:string }>({
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
            login: builder.mutation<CommonServerResponse, { login: string, password: string }>({
                query: (data) => ({
                    url: `/auth/login`,
                    method: 'POST',
                    body: data,
                })
            }),
            logout: builder.mutation<void, unknown>({
                query: (args = {}) => ({
                    url: `/auth/logout`,
                    method: 'POST',
                    body:args
                }),
            }),
            submitUserData: builder.mutation<void, PostFormData>({
                query: (data) => {
                    const formData = new FormData()
                    formData.append('description',data.description)
                    data.files.forEach((photo,index)=> {
                        formData.append('files',photo.src)
                    })
                    formData.append('title',data.title)
                    console.log(formData)
                    return {
                        url: "/user",
                        method: "POST",
                        body: formData,
                        headers: {'Content-Type': 'multipart/form-data'},
                    }
                },
            })
        }
    }
})

export const {useCheckAppQuery,
    useSignUpMutation,
    useResendEmailConfirmationMutation,
    useGetMeQuery,
    useLoginMutation,
    useSignUpConfirmationMutation,
    useResetPasswordMutation,
    usePasswordRecoveryMutation,
    useLogoutMutation,
    useSubmitUserDataMutation} = authApi

//types
export type RegisterParamsType = {
    userName: string
    email: string
    password: string
}

export type ErrorDataType = {
    errorsMessages:string
}
export type CustomerError = {
    data:ErrorDataType,
    status:number
}
export type PostFormData = {
    description: string
    files: ImageType[]
    title: string
}

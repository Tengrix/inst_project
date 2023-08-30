import {authApi, RegisterParamsType} from '@/api/authApi'
import {CommonServerResponse} from "@/api/types/LoginPropsType";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<CommonServerResponse, { login: string, password: string }>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
        }),
        refreshToken: builder.query<void,void>({
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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
        }),
    })
})

export const {
    useSignUpMutation,
    useResendEmailConfirmationMutation,
    useRefreshTokenQuery,
    useLoginMutation,
    useSignUpConfirmationMutation,
    useResetPasswordMutation,
    usePasswordRecoveryMutation,
    useLogoutMutation,
    useLazyRefreshTokenQuery
} = authApiSlice

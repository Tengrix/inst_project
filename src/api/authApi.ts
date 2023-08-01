import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "@/api/instances";
import {RegisterFormType} from "@/pages/sign-up";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include'
    }),
    endpoints: (build) => {
        return {
            checkApp: build.query<void, void>({
                query: () => {
                    return {
                        url: ''
                    }
                }
            }),
            signUp: build.mutation<any, RegisterFormType>({
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
            resendEmailConfirmation: build.mutation<any, { email: string }>({
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
            forgotPassword:build.mutation<any,{email:string}>({
                query:(data)=>{
                    return {
                        method:'POST',
                        url:'/auth/password-recovery',
                        body:{
                            email:data.email
                        }
                    }
                }
            })
        }
    }
})

export const {useCheckAppQuery, useSignUpMutation, useResendEmailConfirmationMutation, useForgotPasswordMutation} = authApi
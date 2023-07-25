import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import * as process from "process";
import {baseURL, inctagramInstance} from "api/instances";
import {SignUpFormData} from "pages/signUp";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
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
            signUp: build.mutation<any, SignUpFormData>({
                query: (data) => {
                    return {
                        method:'POST',
                        url: '/auth/registration',
                        body:{
                            login: data.name,
                            password: data.password,
                            email: data.email
                        }
                    }
                }
            })
        }
    }
})

export const {useCheckAppQuery,useSignUpMutation} = authApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '@/api/instances';
import { GetUserDataResponseType, LoginResponseType } from '@/api/types';
import { PostType } from '@/components/Post/types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include'
    }),
    tagTypes: ['Post'],
    endpoints: builder => {
        return {
            checkApp: builder.query<void, void>({
                query: () => {
                    return {
                        url: ''
                    };
                }
            }),
            getMe: builder.query({
                query: () => ({
                    url: '/auth/refresh-token'
                })
            }),
            signUp: builder.mutation<void, RegisterParamsType>({
                query: data => {
                    return {
                        method: 'POST',
                        url: '/auth/registration',
                        body: {
                            login: data.userName,
                            password: data.password,
                            email: data.email
                        }
                    };
                }
            }),
            signUpConfirmation: builder.mutation<void, { code: string }>({
                query: data => ({
                    url: '/auth/registration-confirmation',
                    method: 'POST',
                    body: data
                })
            }),
            resendEmailConfirmation: builder.mutation<void, { email: string }>({
                query: data => {
                    return {
                        method: 'POST',
                        url: '/auth/registration-email-resending',
                        body: {
                            email: data.email
                        }
                    };
                }
            }),
            passwordRecovery: builder.mutation<void, { email: string; recaptchaValue: string }>({
                query: data => ({
                    url: '/auth/password-recovery',
                    method: 'POST',
                    body: data
                })
            }),
            resetPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
                query: data => ({
                    url: '/auth/new-password',
                    method: 'POST',
                    body: data
                })
            }),
            login: builder.mutation<LoginResponseType, { login: string; password: string }>({
                query: data => ({
                    url: `/auth/login`,
                    method: 'POST',
                    body: data
                })
            }),
            logout: builder.mutation<void, unknown>({
                query: (args = {}) => ({
                    url: `/auth/logout`,
                    method: 'POST',
                    body: args
                })
            }),
            createPost: builder.mutation<void, PostFormData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('description', data.description);
                    data.files.forEach(({ blob, filename }) => {
                        formData.append('files', blob, filename);
                    });
                    formData.append('title', data.title);
                    return {
                        url: '/post',
                        method: 'POST',
                        body: formData
                    };
                },
                invalidatesTags: ['Post']
            }),
            getAllPosts: builder.query<PostType[], void>({
                query: () => {
                    return {
                        url: '/post/all'
                    };
                },
                providesTags: ['Post']
            }),
            deletePost: builder.mutation<any, { id: string }>({
                query: data => {
                    return {
                        url: '/post',
                        method: 'DELETE',
                        body: data
                    };
                },
                invalidatesTags: ['Post']
            }),
            submitUserData: builder.mutation<void, ProfileData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('aboutMe', data.aboutMe);
                    formData.append('birthdayDate', data.birthdayDate);
                    formData.append('city', data.city);
                    formData.append('file', data.file);
                    formData.append('firstName', data.firstName);
                    formData.append('lastName', data.lastName);
                    return {
                        url: '/user',
                        method: 'PATCH',
                        body: formData
                    };
                }
            }),
            getUserData: builder.query<GetUserDataResponseType, void>({
                query: () => {
                    return {
                        url: '/user/profile'
                    };
                }
            })
        };
    }
});

export const {
    useCheckAppQuery,
    useSignUpMutation,
    useResendEmailConfirmationMutation,
    useGetMeQuery,
    useLoginMutation,
    useSignUpConfirmationMutation,
    useResetPasswordMutation,
    usePasswordRecoveryMutation,
    useLogoutMutation,
    useCreatePostMutation,
    useGetAllPostsQuery,
    useDeletePostMutation,
    useSubmitUserDataMutation,
    useGetUserDataQuery
} = authApi;

//types
export type ProfileData = {
    aboutMe: string;
    birthdayDate: string;
    city: string;
    file: Blob;
    firstName: string;
    lastName: string;
};

export type RegisterParamsType = {
    userName: string;
    email: string;
    password: string;
};

export type ErrorDataType = {
    errorsMessages: string;
};
export type CustomerError = {
    data: ErrorDataType;
    status: number;
};
export type FieldError = {
    field: string;
    message: string;
};
export type SignUpError = {
    errorsMessages: FieldError[];
};
export type SignUpErrorType = {
    data: SignUpError;
    status: number;
};
export type PostFormData = {
    description: string;
    files: Array<{
        blob: Blob;
        filename: string;
    }>;
    title: string;
};

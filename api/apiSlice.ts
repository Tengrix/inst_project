import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagramm-backend.vercel.app',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({ 
    register: builder.mutation<any, { login: string; password: string; passwordConfirmation: string; email: string }>({
      query: (data) => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    registrationConfirmation: builder.mutation({
      query: ({ token }) => ({
        url: '/auth/registration-confirmation',
        method: 'POST',
        body: { token },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerEmailResending: builder.mutation({
      query: (data) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body: data,
      }),
    }),
    passwordRecovery: builder.mutation({
      query: (data) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: data,
      }),
    }),
    newPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/new-password',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
  })
});

export const { 
  useRegisterMutation, 
  useRegistrationConfirmationMutation,
  useLoginMutation, 
  useRegisterEmailResendingMutation, 
  usePasswordRecoveryMutation, 
  useNewPasswordMutation, 
  useLogoutMutation, 
  useRefreshTokenMutation 
} = apiSlice;

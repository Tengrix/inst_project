import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    // baseUrl: 'https://instagramm-backend.vercel.app',   // Ссылка на бэк стражеровки
    baseUrl: "https://forum-alpha.vercel.app/api",         // Cсылка на мой бэк 
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        // url: '/auth/registration',                      // Endpoint на бэк стражеровки
        url: '/auth/register',                             // Endpoint на мой бэк
        method: 'POST',
        body: data
      })
    }),

    registerEmailResending: builder.mutation({
      query: (data) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body: data
      })
    }),

    passwordRecovery: builder.mutation({
      query: (data) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: data
      })
    }),

    newPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/new-password',
        method: 'POST',
        body: data
      })
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      })
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      })
    }),
  })
})

export const { 
  useRegisterMutation,  
  useRegisterEmailResendingMutation, 
  usePasswordRecoveryMutation, 
  useNewPasswordMutation, 
  useLoginMutation, 
  useLogoutMutation, 
  useRefreshTokenMutation 
} = apiSlice;

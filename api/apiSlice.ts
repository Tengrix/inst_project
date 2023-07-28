// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (data) => ({
//         url: 'register',
//         method: 'POST',
//         body: data
//       })
//     })
//   })
// })

// export const { useRegisterMutation } = apiSlice;




// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://instagramm-backend.vercel.app' }),
//   endpoints: (builder) => ({

    
//     register: builder.mutation({
//       query: (data) => ({
//         url: '/auth/registration',
//         method: 'POST',
//         body: data
//       })
//     }),

//     registerConfirmation: builder.mutation({
//       query: (data) => ({
//         url: '/auth/registration-confirmation',
//         method: 'POST',
//         body: data
//       })
//     }),

//     registerEmailResending: builder.mutation({
//       query: (data) => ({
//         url: '/auth/registration-email-resending',
//         method: 'POST',
//         body: data
//       })
//     }),

//     passwordRecovery: builder.mutation({
//       query: (data) => ({
//         url: '/auth/password-recovery',
//         method: 'POST',
//         body: data
//       })
//     }),

//     newPassword: builder.mutation({
//       query: (data) => ({
//         url: '/auth/new-password',
//         method: 'POST',
//         body: data
//       })
//     }),

//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials
//       })
//     }),

//     logout: builder.mutation({
//       query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//       })
//     }),

//     refreshToken: builder.mutation({
//       query: () => ({
//         url: '/auth/refresh-token',
//         method: 'POST',
//       })
//     }),

    
//   })
// })

// export const { 
//   useRegisterMutation, 
//   useRegisterConfirmationMutation, 
//   useRegisterEmailResendingMutation, 
//   usePasswordRecoveryMutation, 
//   useNewPasswordMutation, 
//   useLoginMutation, 
//   useLogoutMutation, 
//   useRefreshTokenMutation 
// } = apiSlice;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    // baseUrl: 'https://instagramm-backend.vercel.app',
    baseUrl: "https://forum-alpha.vercel.app/api",
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
        // url: '/auth/registration',
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    // registerConfirmation: builder.mutation({
    //   query: (data) => ({
    //     url: '/auth/registration-confirmation',
    //     method: 'POST',
    //     body: data
    //   })
    // }),
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
  // useRegisterConfirmationMutation, 
  useRegisterEmailResendingMutation, 
  usePasswordRecoveryMutation, 
  useNewPasswordMutation, 
  useLoginMutation, 
  useLogoutMutation, 
  useRefreshTokenMutation 
} = apiSlice;

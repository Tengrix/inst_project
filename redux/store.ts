// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './path_to_your_apiSlice'; // путь до вашего apiSlice

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });



// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { apiSlice } from '../api/apiSlice';  
// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';  

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

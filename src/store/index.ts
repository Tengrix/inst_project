// import {configureStore} from "@reduxjs/toolkit";
// import {TypedUseSelectorHook, useSelector} from "react-redux";
// import {authApi} from "src/api/authApi";

// import { userApi } from 'src/api/generalApi';

// export const store = configureStore({
//     reducer: {
//         [authApi.reducerPath]: authApi.reducer,
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
// })


// export type RootStateType = ReturnType<typeof store.getState>

// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
// export type AppDispatch = typeof store.dispatch




import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authApi } from "src/api/authApi";
import { userApi } from "src/api/generalApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export type AppDispatch = typeof store.dispatch;

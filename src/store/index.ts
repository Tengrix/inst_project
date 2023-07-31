import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authApi} from "src/api/authApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})


export type RootStateType = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

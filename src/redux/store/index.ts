import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authApi} from "src/api/authApi";
import {authReducer} from "@/redux/store/Auth/authSlice";
import {imageReducer} from "@/redux/store/imageSlice/imageSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice:authReducer,
        images:imageReducer

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})


export type RootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()

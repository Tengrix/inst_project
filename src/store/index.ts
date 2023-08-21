import  imagesReducer  from "@/shared/lib/imageSlice";
import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authApi} from "src/api/authApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        images:imagesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})


export type RootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()

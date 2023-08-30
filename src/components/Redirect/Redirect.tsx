import React, {FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import Spinner from "@/shared/ui/spinner/Spinner";
import {useLazyRefreshTokenQuery, useLoginMutation, useRefreshTokenQuery} from "@/redux/store/Auth/authApiSlice";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {authAction} from "@/redux/store/Auth/authSlice";
import {useRouter} from "next/router";
import {PrivateRoutes, PublicRoutes, Routes} from "@/shared/routes/Routes";

export const Redirect: FC<PropsWithChildren> = ({children}) => {
    const [refreshToken, {data,isSuccess,isLoading}] = useLazyRefreshTokenQuery()
    const {token,trustDevice} = useAppSelector(state=> state.auth)
    const dispatch = useAppDispatch()
    const {push} = useRouter()

    useEffect(() => {
        const validateToken = async () => {
            try {
                const newToken = await refreshToken()
                if(isSuccess){
                    dispatch(authAction.setCredentials(newToken?.data))
                }
            }catch (e) {
                console.log(e)
            }
        }
        token==='' ? validateToken() : null
    }, [data])


    return (
        <>
            {isLoading ? <Spinner/> : children}
        </>
    )
};

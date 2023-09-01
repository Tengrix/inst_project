import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import Spinner from "@/shared/ui/spinner/Spinner";
import {useLazyRefreshTokenQuery, useRefreshTokenQuery} from "@/redux/store/Auth/authApiSlice";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {authAction} from "@/redux/store/Auth/authSlice";
import {useRouter} from "next/router";
import {Routes} from "@/shared/routes/Routes";

export const Redirect: FC<PropsWithChildren> = ({children}) => {
    const {data,isSuccess,isError} = useRefreshTokenQuery()
    const [isLoading,setIsLoading] = useState(true)
    const {token,trustDevice} = useAppSelector(state=> state.auth)
    const dispatch = useAppDispatch()
    const {push} = useRouter()

    useEffect(() => {
        if(isSuccess){
            dispatch(authAction.setCredentials(data))
            setIsLoading(false)
        }
    }, [data])

    useEffect(()=>{
        if(isError){
            push(Routes.LOGIN).then(()=>setIsLoading(false))
            setIsLoading(false)
        }
    },[isError])


    console.log('REDIRECT', {token})

    return (
        <>
            {isLoading ? <Spinner/> : children}
        </>
    )
};

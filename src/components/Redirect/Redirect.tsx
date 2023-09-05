import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRefreshTokenQuery } from '@/redux/store/Auth/authApiSlice';
import { authAction } from '@/redux/store/Auth/authSlice';
import { PrivateRoutes, PrivateRoutesType, PublicRoutes, PublicRoutesType, Routes } from '@/shared/routes/Routes';
import Spinner from '@/shared/ui/spinner/Spinner';

export const Redirect: FC<PropsWithChildren> = ({ children }) => {
    const { data, isSuccess, isError } = useRefreshTokenQuery();
    const [isLoading, setIsLoading] = useState(true);
    const { token, trustDevice } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { push, pathname } = useRouter();

    useEffect(() => {
        if (isSuccess) {
            dispatch(authAction.setCredentials(data));
            if (PrivateRoutes.includes(pathname as PrivateRoutesType)) {
                push(pathname).then(() => setIsLoading(false));
            }
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            if (PublicRoutes.includes(pathname as PublicRoutesType)) {
                push(pathname).then(() => setIsLoading(false));
            } else {
                push(Routes.LOGIN).then(() => setIsLoading(false));
            }
        }
    }, [isError, data]);

    return <>{isLoading ? <Spinner /> : children}</>;
};

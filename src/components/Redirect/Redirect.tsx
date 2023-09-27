import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { useRefreshTokenQuery } from '@/api/authApiSlice';
import { useAppDispatch } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { PrivateRoutes, PublicRoutes, Routes } from '@/shared/routes/Routes';
import Spinner from '@/shared/ui/spinner/Spinner';

export const Redirect: FC<PropsWithChildren> = ({ children }) => {
    const {
        data,
        isSuccess,
        isError,
        isLoading: refreshTokenIsLoading
    } = useRefreshTokenQuery(undefined, { pollingInterval: 5 * 60 * 1000, refetchOnMountOrArgChange: true });
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const { push, pathname } = useRouter();

    const isPublicRoute = (path: string): boolean => {
        return PublicRoutes.some(route => path.startsWith(route));
    };

    const isPrivateRoute = (path: string): boolean => {
        return PrivateRoutes.some(route => path.startsWith(route));
    };

    // useEffect(() => {
    //     if (isSuccess) {
    //         dispatch(authAction.setCredentials(data));
    //         setIsLoading(false);
    //     }
    // }, [data]);
    // useEffect(() => {
    //     if (isPublicRoute(pathname)) {
    //         setIsLoading(false);
    //     } else {
    //         isError && push(Routes.LOGIN).then(() => setIsLoading(false));
    //     }
    // }, [isError, data]);

    useEffect(() => {
        if (refreshTokenIsLoading) {
            setIsLoading(true);
        } else {
            if (isPublicRoute(pathname)) {
                setIsLoading(false);
            } else {
                if (isSuccess) {
                    dispatch(authAction.setCredentials(data));
                    setIsLoading(false);
                } else {
                    push(Routes.LOGIN).then(() => setIsLoading(false));
                }
            }
        }
    }, [data, refreshTokenIsLoading, dispatch, pathname, isSuccess, push]);

    return <>{isLoading ? <Spinner /> : children}</>;
};

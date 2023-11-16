import { BarChartIcon, BookmarkIcon, ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { signOut as googleSignOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useLogoutMutation } from '@/api/authApiSlice';
import { useAppDispatch } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { Button } from '@/shared/ui/button/button';

import s from '../Sidebar.module.scss';

export const SidebarAdditionalInfo = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const t = useTranslations('sidebar');

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            googleSignOut();
            dispatch(authAction.logOut());
            // router.push(Routes.LOGIN);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Link className={s.route} href={'/statistics'}>
                <BarChartIcon height={60} width={24} />
                <span>{t('statistics')}</span>
            </Link>
            <Link className={s.route} href={'/favorites'}>
                <BookmarkIcon height={60} width={24} />
                <span>{t('favourites')}</span>
            </Link>
            <Button
                className={s.route}
                variant={'link'}
                isLoading={isLoading}
                disabled={isLoading}
                onClick={logoutHandler}>
                <ExitIcon height={60} width={24} />
                <span>{t('logOut')}</span>
            </Button>
        </>
    );
};

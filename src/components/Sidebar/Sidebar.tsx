import {
    BarChartIcon,
    BookmarkIcon,
    ChatBubbleIcon,
    ExitIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PersonIcon,
    PlusCircledIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { useLogoutMutation } from '@/api/authApiSlice';
import CreatePostModal from '@/components/CreatePostModal/CreatePostModal';
import { useAppDispatch } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { Routes } from '@/shared/routes/Routes';
import { Button } from '@/shared/ui/button';

import s from './Sidebar.module.scss';

const Sidebar = () => {
    const [logout, { isLoading, isSuccess }] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const t = useTranslations('sidebar');
    const [createPostModal, setCreatePostModal] = useState(false);
    const routes = [
        { title: t('home'), icon: <HomeIcon height={60} width={24} />, path: '/home' },
        {
            title: t('publish'),
            icon: <PlusCircledIcon height={60} width={24} />,
            path: '/create',
            onClick: () => setCreatePostModal(true)
        },
        { title: t('myProfile'), icon: <PersonIcon height={60} width={24} />, path: '/profile' },
        { title: t('messenger'), icon: <ChatBubbleIcon height={60} width={24} />, path: '/messenger' },
        { title: t('search'), icon: <MagnifyingGlassIcon height={60} width={24} />, path: '/search' }
    ];

    const sidebarItems = routes.map(route => {
        if (route.path) {
            return (
                <Link
                    href={route.path}
                    className={s.route}
                    key={route.title}
                    onClick={e => {
                        if (route.onClick) {
                            e.preventDefault();
                            route.onClick();
                        }
                    }}>
                    {route.icon}
                    <span>{route.title}</span>
                </Link>
            );
        }
    });
    const logoutHandler = async () => {
        try {
            await logout()
                .unwrap()
                .then(() => router.push(Routes.LOGIN));
        } catch (error) {
            console.log(error);
        }
        dispatch(authAction.logOut());
    };

    return (
        <div className={s.container}>
            <div className={s.sidebarRoutes}>
                <div className={s.wrapper}>{sidebarItems}</div>
                <div className={s.wrapper}>
                    <Link className={s.route} href={'/statistics'}>
                        <BarChartIcon height={60} width={24} />
                        <span>{t('statistics')}</span>
                    </Link>
                    <Link className={s.route} href={'/favorites'}>
                        <BookmarkIcon height={60} width={24} />
                        <span>{t('favourites')}</span>
                    </Link>
                    {/* <div className={s.footer}></div> */}
                    <Link className={s.route} href={'/sign-in'}>
                        <ExitIcon height={60} width={24} />
                        <Button
                            className={s.btn}
                            variant={'link'}
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={logoutHandler}>
                            <span>{t('logOut')}</span>
                        </Button>
                    </Link>
                </div>
            </div>
            <CreatePostModal open={createPostModal} modalHandler={setCreatePostModal} />
        </div>
    );
};

export default Sidebar;

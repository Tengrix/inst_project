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
import { signOut as googleSignOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { useLogoutMutation } from '@/api/authApiSlice';
import CreatePostModal from '@/components/CreatePostModal/CreatePostModal';
import { useAppDispatch } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/button';

import s from './Sidebar.module.scss';

const Sidebar = () => {
    const [logout, { isLoading, isSuccess }] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const t = useTranslations('sidebar');
    const [createPostModal, setCreatePostModal] = useState(false);
    const currentURL = useRouter();
    const nav = useRef(null);
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

    const [isInVisibleMenu, setIsInVisibleMenu] = useState(false);
    const [scrollPostion, setScroolPosition] = useState(0);

    const scrolling = () => {
        if (scrollPostion < scrollY) {
            setIsInVisibleMenu(true);
            setScroolPosition(scrollY);
        } else setIsInVisibleMenu(false);
    };
    useEffect(() => {
        window.addEventListener('scroll', scrolling);
        return () => window.removeEventListener('scroll', scrolling);
    }, [scrollPostion]);

    const sidebarItems = routes.map(route => {
        if (route.path) {
            return (
                <Link
                    href={route.path}
                    className={route.path === currentURL.asPath ? `${s.route} ${s.route_active}` : s.route}
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
            await logout().unwrap();
            googleSignOut();
            dispatch(authAction.logOut());
            // router.push(Routes.LOGIN);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div ref={nav} className={`${s.container} ${isInVisibleMenu ? s.inVisibleMenu : ''}`}>
            <div className={s.sidebarRoutes}>
                <div className={s.wrapper}>{sidebarItems}</div>
                <div className={`${s.wrapper} ${s.wrapperAdditionalInformationLogOut}`}>
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
                </div>
            </div>
            <CreatePostModal open={createPostModal} modalHandler={setCreatePostModal} />
        </div>
    );
};

export default Sidebar;

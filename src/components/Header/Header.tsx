import { BarChartIcon, BellIcon, BookmarkIcon, DotsHorizontalIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import LangSwitcher from '@/components/LangSwitcher/LangSwitcher';
import { SideBarRoutesType } from '@/shared/types/CommonTypes';
import CustomPopover from '@/shared/ui/popover/Popover';

import styles from './styles.module.css';

export type HeaderProps = {
    title?: string;
    children?: ReactNode;
    icon?: ReactNode;
};

const Header = (props: HeaderProps) => {
    const { title = 'Inctagram', children, icon = <BellIcon height={24} width={24} /> } = props;

    const sideBarRoutes: SideBarRoutesType[] = [
        { title: 'Profile Settings', icon: <GearIcon height={60} width={24} />, path: '/settings' },
        { title: 'Statistics', icon: <BarChartIcon height={60} width={24} />, path: '/statistics' },
        { title: 'Favorites', icon: <BookmarkIcon height={60} width={24} />, path: '/favorites' },
        { title: 'Log Out', icon: <ExitIcon height={60} width={24} />, path: '/' }
    ];
    const mappedRoutes = sideBarRoutes.map(route => (
        <div key={route.path} className={styles.dotsIcon}>
            <div className={styles.icon}>{route.icon}</div>
            <Link href={route.path}>
                <div>{route.title}</div>
            </Link>
        </div>
    ));
    return (
        <div className={styles.header}>
            <div className={styles.text}>
                <Link href={'/profile'}>
                    <h1 className={styles.inctagramTitle}> {title} </h1>
                </Link>
            </div>
            <div className={styles.languageSelector}>
                {children}
                <div className={styles.notificationIcon}>{icon}</div>
                <LangSwitcher />
                <div className={styles.dots}>
                    <CustomPopover
                        icon={<DotsHorizontalIcon width={25} height={25} />}
                        contentChildren={mappedRoutes}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;

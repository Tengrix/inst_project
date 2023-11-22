import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { SidebarRouteType } from '../UserRouting/UserRouting';

import { SidebarAdditionalInfo } from './AdditionalInfo/SidebarAdditionaInfo';
import s from './Sidebar.module.scss';

type SidebarPropsType = {
    routes: Array<SidebarRouteType>;
    isUser?: Boolean;
};

const Sidebar = (props: SidebarPropsType) => {
    const { routes, isUser } = props;

    const t = useTranslations('sidebar');

    const currentURL = useRouter();
    const nav = useRef(null);

    const [isInVisibleMenu, setIsInVisibleMenu] = useState(false);
    const [scrollPosition, setScroolPosition] = useState(0);

    const scrolling = () => {
        if (scrollPosition < scrollY) {
            setIsInVisibleMenu(true);
            setScroolPosition(scrollY);
        } else setIsInVisibleMenu(false);
    };
    useEffect(() => {
        window.addEventListener('scroll', scrolling);
        return () => window.removeEventListener('scroll', scrolling);
    }, [scrollPosition]);

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
                    <span>{t(route.title)}</span>
                </Link>
            );
        }
    });

    return (
        <div ref={nav} className={`${s.container} ${isInVisibleMenu ? s.inVisibleMenu : ''}`}>
            <div className={s.sidebarRoutes}>
                <div className={s.wrapper}>{sidebarItems}</div>
                <div className={`${s.wrapper} ${s.wrapperAdditionalInformationLogOut}`}>
                    {isUser && <SidebarAdditionalInfo />}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

import React from 'react';
import s from './Sidebar.module.scss'
import {
    HomeIcon,
    PlusCircledIcon,
    PersonIcon,
    ChatBubbleIcon,
    MagnifyingGlassIcon,
    BarChartIcon,
    BookmarkIcon,
    ExitIcon
} from '@radix-ui/react-icons'
import Link from "next/link";

const routes = [
    {title: 'Home', icon: <HomeIcon height={60} width={24}/>, route: '/home'},
    {title: 'Create', icon: <PlusCircledIcon height={60} width={24}/>, route: '/create'},
    {title: 'My Profile', icon: <PersonIcon height={60} width={24}/>, route: '/profile'},
    {title: 'Messenger', icon: <ChatBubbleIcon height={60} width={24}/>, route: '/messenger'},
    {title: 'Search', icon: <MagnifyingGlassIcon height={60} width={24}/>, route: '/search'}
]
const Sidebar = () => {
    return (
        <div className={s.container}>
            <div className={s.sidebarRoutes}>
                <div className={s.wrapper}>
                        {routes.map(route => {
                            return <Link href={route.route} className={s.route} key={route.title}>
                                {route.icon}
                                <span>{route.title}</span>
                            </Link>
                        })}
                </div>
                <div className={s.wrapper}>
                        <Link className={s.route} href={'/statistics'}>
                            <BarChartIcon height={60} width={24}/>
                            <span>Statistics</span>
                        </Link>
                        <Link className={s.route} href={'/favorites'}>
                            <BookmarkIcon height={60} width={24}/>
                            <span>Favorites</span>
                        </Link>
                    <div className={s.footer}>
                        <Link className={s.route} href={'/sign-in'}>
                            <ExitIcon height={60} width={24}/>
                            <span>Log out</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

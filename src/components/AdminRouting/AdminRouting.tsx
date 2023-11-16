import { HomeIcon } from '@radix-ui/react-icons';

import Sidebar from '@/components/Sidebar/Sidebar';
import { SidebarRouteType } from '@/components/UserRouting/UserRouting';
type SidebarRoutesTypes = Array<SidebarRouteType>;

export const AdminRouting = () => {
    const adminRoutes: SidebarRoutesTypes = [
        { title: 'usersList', icon: <HomeIcon height={60} width={24} />, path: '/users-list' },
        {
            title: 'statistics',
            icon: <HomeIcon height={60} width={24} />,
            path: '/statistics'
        },
        { title: 'paymentsList', icon: <HomeIcon height={60} width={24} />, path: '/payments-list' },
        { title: 'postsList', icon: <HomeIcon height={60} width={24} />, path: '/posts-list' }
    ];

    return (
        <>
            <Sidebar routes={adminRoutes} />
        </>
    );
};

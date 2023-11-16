import { HomeIcon } from '@radix-ui/react-icons';

import { PaymentsIcon } from '@/assets/icons/PaymentsIcon';
import { PostsIcon } from '@/assets/icons/PostsIcon';
import { StatisticsIcon } from '@/assets/icons/StatisticsIcon co';
import { UsersIcon } from '@/assets/icons/UsersIcon';
import Sidebar from '@/components/Sidebar/Sidebar';
import { SidebarRouteType } from '@/components/UserRouting/UserRouting';
type SidebarRoutesTypes = Array<SidebarRouteType>;

export const AdminRouting = () => {
    const adminRoutes: SidebarRoutesTypes = [
        { title: 'usersList', icon: <UsersIcon height={60} width={24} />, path: '/users-list' },
        {
            title: 'statistics',
            icon: <StatisticsIcon height={60} width={24} />,
            path: '/statistics'
        },
        { title: 'paymentsList', icon: <PaymentsIcon height={60} width={24} />, path: '/payments-list' },
        { title: 'postsList', icon: <PostsIcon height={60} width={24} />, path: '/posts-list' }
    ];

    return (
        <>
            <Sidebar routes={adminRoutes} />
        </>
    );
};

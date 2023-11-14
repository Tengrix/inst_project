import { ChatBubbleIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ReactElement, useState } from 'react';

import CreatePostModal from '../CreatePostModal/CreatePostModal';
import Sidebar from '../Sidebar/Sidebar';

export type SidebarRouteType = {
    title: string;
    icon: ReactElement;
    path: string;
    onClick?: () => void;
};
type SidebarRoutesTypes = Array<SidebarRouteType>;

export const UserRouting = () => {
    const [isShowPopUp, setIsShowPopUp] = useState(false);

    const routes: SidebarRoutesTypes = [
        { title: 'home', icon: <HomeIcon height={60} width={24} />, path: '/home' },
        {
            title: 'publish',
            icon: <PlusCircledIcon height={60} width={24} />,
            path: '/create',
            onClick: () => setIsShowPopUp(true)
        },
        { title: 'myProfile', icon: <PersonIcon height={60} width={24} />, path: '/profile' },
        { title: 'messenger', icon: <ChatBubbleIcon height={60} width={24} />, path: '/messenger' },
        { title: 'search', icon: <MagnifyingGlassIcon height={60} width={24} />, path: '/search' }
    ];

    return (
        <>
            <Sidebar routes={routes} />
            <CreatePostModal open={isShowPopUp} modalHandler={setIsShowPopUp} />
        </>
    );
};

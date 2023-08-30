import React, {useState} from 'react';
import s from './Sidebar.module.scss'
import {
    HomeIcon,
    PlusCircledIcon,
    PersonIcon,
    ChatBubbleIcon,
    MagnifyingGlassIcon,
    BarChartIcon,
    BookmarkIcon,
    ExitIcon,
} from '@radix-ui/react-icons'
import Link from "next/link";
import {Button} from "@/shared/ui/button";
import {useRouter} from "next/router";
import CreatePostModal from "@/components/CreatePostModal/CreatePostModal";
import {useAppDispatch} from "@/redux/store";
import {useLogoutMutation} from "@/redux/store/Auth/authApiSlice";
import {authAction} from "@/redux/store/Auth/authSlice";


const Sidebar = () => {
    const [logout, {isLoading}] = useLogoutMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [createPostModal, setCreatePostModal] = useState(false)
    const routes = [
        {title: 'Home', icon: <HomeIcon height={60} width={24}/>, path: '/home'},
        {title: 'Create', icon: <PlusCircledIcon height={60} width={24}/>, path: '/create', onClick: ()=>setCreatePostModal(true)},
        {title: 'My Profile', icon: <PersonIcon height={60} width={24}/>, path: '/profile'},
        {title: 'Messenger', icon: <ChatBubbleIcon height={60} width={24}/>, path: '/messenger'},
        {title: 'Search', icon: <MagnifyingGlassIcon height={60} width={24}/>, path: '/search'}
    ]

    const sidebarItems = routes.map(route => {
        if(route.path) {
            return <Link href={route.path} className={s.route} key={route.title}
                         onClick={(e) => {
                             if(route.onClick) {
                                 e.preventDefault()
                                 route.onClick()
                             }}}
                         >
                {route.icon}
                <span>{route.title}</span>
            </Link>
        }
        })
    const logoutHandler = async () => {
        try{
            await logout().unwrap()
        }catch (error){
            console.log(error)
        }finally {
            if(!isLoading){
                await router.push('/sign-in')
            }
        }
        dispatch(authAction.logOut())
    }

    return (
        <div className={s.container}>
            <div className={s.sidebarRoutes}>
                <div className={s.wrapper}>
                        {sidebarItems}
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
                </div>
                <div className={s.footer}>
                    <Link className={s.route} href={'/sign-in'}>
                        <ExitIcon height={60} width={24}/>
                        <Button variant={'link'} isLoading={isLoading} disabled={isLoading} onClick={logoutHandler}>
                            Log out
                        </Button>
                    </Link>
                </div>
            </div>
            <CreatePostModal open={createPostModal} modalHandler={setCreatePostModal} />
        </div>
    );
};

export default Sidebar;

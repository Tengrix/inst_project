import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAppSelector } from '@/redux/store';
import Spinner from '@/shared/ui/spinner/Spinner';

const Profile = () => {
    const router = useRouter();
    const authData = useAppSelector(state => state.authSlice.isInit);

    useEffect(() => {
        if (!authData) {
            router.push('/sign-in');
        }
    }, [authData, router]);

    return (
        <div>
            {authData ? (
                <div>
                    <Sidebar />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

Profile.getLayout = getLayoutWithSidebar;

export default Profile;

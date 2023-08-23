import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import Sidebar from '@/components/Sidebar/Sidebar';
import Spinner from '@/shared/ui/spinner/Spinner';

import { useAppSelector } from '@/redux/store';

const Profile = () => {
    const router = useRouter();
    const authData = useAppSelector(state => state.authSlice.isInit);

    useEffect(() => {
        if (!authData) {
            router.push('/sign-in');
        }
    }, [authData]);

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

Profile.getLayout = getLayout;

export default Profile;

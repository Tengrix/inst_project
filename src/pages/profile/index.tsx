import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetUserDataQuery } from '@/api/authApi';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/shared/ui/button';
import Spinner from '@/shared/ui/spinner/Spinner';
import { Typography } from '@/shared/ui/typography';

import s from './styles.module.scss';

const Profile = () => {
    const router = useRouter();
    const authData = useAppSelector(state => state.authSlice.isInit);
    const { data: userData } = useGetUserDataQuery();
    const noAvatarUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXGxsb////JycnDw8Pv7+/8/Pza2trNzc3g4ODy8vLm5ub4+PjV1dXj4+Pr6+vp6ekuEkSCAAADOElEQVR4nO3cW3OrIBSGYXSpeIr+/3+7RZumnaSpix2Di75PLzqdyQVfOQgIcQ4AAAAAAAAAAAAAAAAAAAAAAAA4Tpm6AEeTq9QFOYRIOTZtX1XTpR29yy2kiG+7urgZpjGnkOKarrhTzz6XjNIMa6L7kFMWGcU/qL/PerxsnzE7xi41JO2DuvuiM1+N89N8oRpHyxHFPWmhnxqrEUPf2hPQbkRxUu0KaDZiKfPDR8QjPnVho0izswYXQ+rCRil31t9qNthOZVIELIoxdXn1RlXAYjBXibvHUauVKF4ZsOiMVaKyFwbWJqiagXTT20qoHGcCW2ON9PqEhalFogwRCZvUpVbRd0NjHdHHJKwsJYwYaIwNNYplxU1tKKFm4UTCc/oDCbMfafQri8DU0yL/J37crM1Uwuxn3jGTGktD6UL0CS/GEv76zumOtV0Mv3dD/8raTlT+u4nqaU2XusB62l19a43UKdf5k8GAqgVGbfP40P52WpsbZlay9zW+sRnpTZhm7puAtzYDbvZENB3QuV8f/LXRJroJDbV9Em75GcIxDMsZF/5ZS+1Tl+4lpB3uD9asf1fW1hM/EdcM9/nqPE6XfhDxl28Px7pqSsns6L5I6Zt+mqpp7jM8yf5BxOV7GeGvyKvjAQCAh+Tbr8zI7YpsHlPTLwnWPH5s+7nq6mAYumoOV2VNJ90moEuAcmynH7dN625ufOk+c9qatoabzW21YzdxjemM1ebS+pZ0u97M1Nunhn5Z85sJKW6cYs7TdK3fQp64sa5dKi7eZriGPKuw4RRzVmiz/WO6sEV1UiKPrt1HJO23bcazBb3fFP0PYav4bFfY5YX5rhnPRMbX5itCWz1RM5Xfb91HZRzPMq4eUIEfpnMMq3I5KN9iOENvjLhpqJD6OyVCI9KeX9MKEVM+N6TSnkFUqhMfRYk67azNmPQLF6LuVWil/MIF1dcmxEt3TeHI58Q3ydrpm6qwTlaJcfe3YhKm6onqo9zxUp3OPGo6ei/R4b43dcMgUUcs3xYw1cW9/BO67BPmX4ckJCEJSUhCEpKQhC+V6hp0+T6nfrkPAAAAAAAAAAAAAAAAAAAAAAAAvNc/BaMjNJZwCScAAAAASUVORK5CYII=';

    // useEffect(() => {
    //     if (!authData) {
    //         router.push('/sign-in');
    //     }
    // }, [authData, router]);
    //
    // if(!authData) {
    //     return <Spinner/>
    // }
    if (!userData) {
        return <Spinner />;
    }
    const following: number = 512356123;
    const followers: number = 8656456132;
    const publications: number = 7821238;

    return (
        <div className={s.container}>
            <div className={s.profileHeader}>
                <Image src={userData.photo ? userData.photo : noAvatarUrl} alt="userAva" width={250} height={250} />
                <div className={s.profileInfo}>
                    <div className={s.username}>
                        <Typography variant={'h1'}>{`${userData.firstName} ${userData.lastName}`}</Typography>
                        <Link href={'/profile-settings/general-information'}>
                            <Button variant={'secondary'}>Profile Settings</Button>
                        </Link>
                    </div>
                    <div className={s.profileStats}>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{following.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>Following</Typography>
                        </div>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{followers.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>Followers</Typography>
                        </div>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{publications.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>Publications</Typography>
                        </div>
                    </div>
                    <div className={s.aboutMe}>{userData.aboutMe}</div>
                </div>
            </div>
            <div className={s.photoGallery}>photos</div>
        </div>
    );
};

Profile.getLayout = getLayoutWithSidebar;

export default Profile;

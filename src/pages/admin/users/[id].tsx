import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from '/public/assets/noAvatar.png';

import { createTranslator, useFormatter } from 'next-intl';
import React from 'react';

import { useGetUserByIdQuery } from '@/api/queries/users.generated';
import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import PhotoGallery from '@/components/PhotoGallery/PhotoGallery';
import GeneralInformation from '@/components/profileSettings/general-information';
import Payments from '@/components/profileSettings/payments';
import Spinner from '@/shared/ui/spinner/Spinner';
import CustomTabs from '@/shared/ui/tabs/Tabs';

import s from './user.module.scss';

export async function getServerSideProps({ locale = 'en' }) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages
            // title: t('myProfile.pageTitle')
        }
    };
}

const User = () => {
    const router = useRouter();
    const { loading, error, data } = useGetUserByIdQuery({
        variables: { id: router.query.id as string }
    });
    const format = useFormatter();
    const registrationDate = new Date(+data?.getUserById?.createdAt!);

    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    const UploadedPhotos = {
        value: 'profile',
        // title: t('tab.generalInformation.generalInformationTitle'),
        title: 'UploadedPhotos',
        children: <PhotoGallery photos={data?.getUserById.usersPhoto!} />
    };
    const Payments = {
        value: 'devices',
        // title: t('tab.devices.devicesTitle'),
        title: 'Payments',
        children: <div></div>
    };
    const Followers = {
        value: 'account',
        // title: t('tab.accountManagement.accountManagementTitle'),
        title: 'Followers',
        children: <div></div>
    };
    const Following = {
        value: 'payments',
        // title: t('tab.myPayments.myPaymentsTitle'),
        title: 'Following',
        children: <div></div>
    };
    const Tabs = [UploadedPhotos, Payments, Followers, Following];

    return (
        <div className={s.user}>
            <div className={s.user__container}>
                {data ? (
                    <>
                        <div className={s.user__info}>
                            <Image
                                className={s.user__photo}
                                src={data.getUserById.photo ?? Avatar}
                                alt={data.getUserById.login as string}
                                width={60}
                                height={60}
                            />
                            <div className={s.user__data}>
                                <h1 className={s.user__name}>
                                    {data.getUserById.firstName} {data.getUserById.lastName}
                                </h1>
                                <p className={s.user__login}>
                                    <Link href="#" target="_blank">
                                        {data.getUserById.login}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className={s.user__addition}>
                            <div>
                                <p>UserID</p>
                                <p>{data.getUserById.login}</p>
                            </div>
                            <div>
                                <p>Profile Creation Date</p>
                                <p>{format.dateTime(registrationDate)}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>User does not exist</div>
                )}
            </div>
            <CustomTabs tabs={Tabs} />
        </div>
    );
};

User.getLayout = getLayoutAdmin;

export default User;

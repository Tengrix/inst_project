import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';
import React from 'react';

import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import GeneralInformation from '@/pages/profile-settings/general-information';
import CustomTabs from '@/shared/ui/tabs/Tabs';

import s from './styles.module.scss';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('profileSettings.pageTitle')
        }
    };
}

const ProfileSettings = () => {
    const ProfileTab = { title: 'General information', children: <GeneralInformation /> };
    const Devices = { title: 'Devices', children: <div>Devices</div> };
    const AccountManagement = { title: 'Account Management', children: <div>Account Management</div> };
    const MyPayments = { title: 'My Payments', children: <div>My Payments</div> };

    const Tabs = [ProfileTab, Devices, AccountManagement, MyPayments];

    return (
        <div className={s.container}>
            <CustomTabs tabs={Tabs} />
        </div>
    );
};
ProfileSettings.getLayout = getLayoutWithSidebar;
export default ProfileSettings;

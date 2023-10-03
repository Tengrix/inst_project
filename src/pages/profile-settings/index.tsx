import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next/types';
import { createTranslator, useTranslations } from 'next-intl';
import React from 'react';

import DevicesTab from '@/components/Devices/DevicesTab';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import GeneralInformation from '@/components/profileSettings/general-information';
import CheckoutForm from '@/components/profileSettings/payments/stripe/CheckoutForm';
import CustomTabs from '@/shared/ui/tabs/Tabs';

import Payments from '../../components/profileSettings/payments';

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
type ProfileTabValue = 'profile' | 'devices' | 'account' | 'payments';

const ProfileSettings = () => {
    const t = useTranslations('profileSettings');

    const { query, isReady } = useRouter();
    //const router = useRouter();

    let isSuccess = undefined;
    let defaultTab: ProfileTabValue = 'profile';
    if (isReady && 'success' in query) {
        isSuccess = query.success === 'true';
        defaultTab = 'account';
    }

    /* const activateAccountTab = () => {
          defaultTab = 'account';
        isSuccess = undefined;
        router.push('/profile-settings');
    }; */

    const ProfileTab = {
        value: 'profile',
        title: t('tab.generalInformation.generalInformationTitle'),
        children: <GeneralInformation />
    };
    const Devices = {
        value: 'devices',
        title: t('tab.devices.devicesTitle'),
        children: (
            <div>
                <DevicesTab />
            </div>
        )
    };
    const AccountManagement = {
        value: 'account',
        title: t('tab.accountManagement.accountManagementTitle'),
        children: <CheckoutForm success={isSuccess} /* activateAccountTab={activateAccountTab} */ />
    };
    const MyPayments = {
        value: 'payments',
        title: t('tab.myPayments.myPaymentsTitle'),
        children: <Payments />
    };

    const Tabs = [ProfileTab, Devices, AccountManagement, MyPayments];

    return (
        <div className={s.container}>
            <CustomTabs tabs={Tabs} defaultTab={defaultTab} />
        </div>
    );
};
ProfileSettings.getLayout = getLayoutWithSidebar;
export default ProfileSettings;

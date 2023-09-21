import { GetStaticPropsContext } from 'next/types';
import { createTranslator, useTranslations } from 'next-intl';
import React from 'react';

import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import CheckoutForm from '@/components/payments/stripe/CheckoutForm';
import GeneralInformation from '@/pages/profile-settings/general-information';
import CustomTabs from '@/shared/ui/tabs/Tabs';

import Payments from './payments';
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
    const t = useTranslations('profileSettings');
    const ProfileTab = {
        value: 'profile',
        title: t('tab.generalInformation.generalInformationTitle'),
        children: <GeneralInformation />
    };
    const Devices = {
        value: 'devices',
        title: t('tab.devices.devicesTitle'),
        children: <div>{t('tab.devices.devicesTitle')}</div>
    };
    const AccountManagement = {
        value: 'account',
        title: t('tab.accountManagement.accountManagementTitle'),
        children: <CheckoutForm />
    };
    const MyPayments = {
        value: 'payments',
        title: t('tab.myPayments.myPaymentsTitle'),
        children: <Payments />
    };

    const Tabs = [ProfileTab, Devices, AccountManagement, MyPayments];

    return (
        <div className={s.container}>
            <CustomTabs tabs={Tabs} />
        </div>
    );
};
ProfileSettings.getLayout = getLayoutWithSidebar;
export default ProfileSettings;

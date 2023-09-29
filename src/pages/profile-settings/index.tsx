import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next/types';
import { createTranslator, useTranslations } from 'next-intl';
import React from 'react';

import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import CheckoutForm from '@/components/payments/stripe/CheckoutForm';
import CustomTabs from '@/shared/ui/tabs/Tabs';
import { GeneralInformation } from '@/widgets/generalInformation';

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
type ProfileTabValue = 'profile' | 'devices' | 'account' | 'payments';

const ProfileSettings = (props: any) => {
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
        children: <div>{t('tab.devices.devicesTitle')}</div>
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

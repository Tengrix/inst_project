import React from 'react';

import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import GeneralInformation from '@/pages/profile-settings/general-information';
import { Button } from '@/shared/ui/button';
import CustomTabs from '@/shared/ui/tabs/Tabs';
import { useGetUserDataQuery } from '@/api/authApi';

const ProfileSettings = () => {
    const ProfileTab = { title: 'General information', children: <GeneralInformation /> };
    const Devices = { title: 'Devices', children: <div>Devices</div> };
    const AccountManagement = { title: 'Account Management', children: <div>Account Management</div> };
    const MyPayments = { title: 'My Payments', children: <div>My Payments</div> };


    const Tabs = [ProfileTab, Devices, AccountManagement, MyPayments];

    return (
        <div>
            <CustomTabs tabs={Tabs} />
        </div>
    );
};
ProfileSettings.getLayout = getLayout;
export default ProfileSettings;

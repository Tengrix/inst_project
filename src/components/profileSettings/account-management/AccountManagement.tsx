import { useEffect, useState } from 'react';

import { SubscriptionsType, SubscriptionType } from '@/components/profileSettings/payments/stripe/CheckoutForm';
import { AccountRadio } from 'src/components/profileSettings/account-management/accountRadio/AccountType';
import { SubscriptionRadio } from 'src/components/profileSettings/account-management/subscriptionRadio/SubscriptionRadio';

type AccountManagementPropsType = {
    subscriptions: SubscriptionsType;
    setIsShowPaymentAndCosts: (value: boolean) => void;
    setSubscription: (subscription: SubscriptionType) => void;
    isSubscriptions: boolean;
};

const AccountManagement = ({
    subscriptions,
    setIsShowPaymentAndCosts,
    setSubscription,
    isSubscriptions
}: AccountManagementPropsType) => {
    const [currentRadioValue, setCurrentRadioValue] = useState('personal'); //cb for accountTypes

    useEffect(() => {
        if (isSubscriptions) {
            setCurrentRadioValue('business');
            setIsShowPaymentAndCosts(true);
        }
    }, [isSubscriptions, setIsShowPaymentAndCosts]);

    const currentValue = currentRadioValue === 'business' && (
        <SubscriptionRadio setSubscription={setSubscription} subscriptions={subscriptions} />
    );

    return (
        <>
            <AccountRadio
                setIsShowPaymentAndCosts={setIsShowPaymentAndCosts}
                isSubscriptions={isSubscriptions}
                currentRadioValue={currentRadioValue}
                setCurrentRadioValue={setCurrentRadioValue}
            />
            {currentValue}
        </>
    );
};
export default AccountManagement;

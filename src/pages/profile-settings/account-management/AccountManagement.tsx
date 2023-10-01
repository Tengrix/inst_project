import { useEffect, useState } from 'react';

import { AccountRadio } from './accountRadio/AccountType';
import { SubscriptionRadio } from './subscriptionRadio/SubscriptionRadio';

export type PaymentIntervalType = 'day' | 'week' | 'month';

type AccountManagementPropsType = {
    setIsShowPaymentAndCosts: (value: boolean) => void;
    setSubscriptionCost: (cost: string) => void;
    setPaymentInterval: (interval: PaymentIntervalType) => void;
    isSubscriptions: boolean;
};

const AccountManagement = ({
    setIsShowPaymentAndCosts,
    setSubscriptionCost,
    setPaymentInterval,
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
        <SubscriptionRadio setPaymentInterval={setPaymentInterval} setSubscriptionCost={setSubscriptionCost} />
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

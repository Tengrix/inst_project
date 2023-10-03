import React, { useEffect, useState } from 'react';

import { useGetUserDataQuery } from '@/api/api';
import AccountManagement from '@/components/profileSettings/account-management/AccountManagement';
import { ActiveSubscriptions } from '@/components/profileSettings/account-management/activeSubscriptions/ActiveSubscriptions';
import { CustomPaymentBtn } from '@/components/profileSettings/account-management/customPaymentBtn/CustomPaymentBtn';
import Spinner from '@/shared/ui/spinner/Spinner';
import { fetchCheckoutSession, fetchSubscriptions } from '@/shared/utils/stripe/api/queries';
import { CheckoutFormModal } from 'src/components/profileSettings/payments/stripe/checkoutFormModal/CheckoutFormModal';

type CheckoutFormPropsType = {
    success: boolean | undefined;
};

export type PaymentIntervalType = 'day' | 'week' | 'month';

export type SubscriptionType = {
    id: string;
    name: string;
    value: string;
    title: string;
    interval: PaymentIntervalType;
};

export type SubscriptionsType = Array<SubscriptionType>;

const subscriptions: SubscriptionsType = [
    {
        id: '10$-per-1-day',
        name: '10$-per-1-day',
        value: '1000',
        title: 'profileSettings.tab.accountManagement.accountTypeBusinessPrice.perDay',
        interval: 'day'
    },
    {
        id: '50$-per-7-day',
        name: '50$-per-7-day',
        value: '5000',
        title: 'profileSettings.tab.accountManagement.accountTypeBusinessPrice.perWeek',
        interval: 'week'
    },
    {
        id: '100$-per-month',
        name: '100$-per-month',
        value: '10000',
        title: 'profileSettings.tab.accountManagement.accountTypeBusinessPrice.perMonth',
        interval: 'month'
    }
];

const CheckoutForm = ({ success }: CheckoutFormPropsType) => {
    const payment_method_types = ['card'];
    const [loading, setLoading] = useState(false);
    const [isShowLoader, setIsShowLoader] = useState(true); //loader

    const [subscription, setSubscription] = useState(subscriptions[0]);

    const [customerEmail, setCustomerEmail] = useState('');
    const [isShowPaymentAndCosts, setIsShowPaymentAndCosts] = useState(false); //callback for radio buttons
    const [isModalOpen, setIsModalOpen] = useState(false); //modal for stripe request, callback for CheckoutFormModal
    const [customerSubscriptions, setCustomerSubscriptions] = useState([]); //subscriptions for render 'active' payments and for disable type 'personal' in radio accountManagement(radio buttons)

    const { data, isSuccess } = useGetUserDataQuery();

    useEffect(() => {
        setIsShowLoader(true);
        if (success !== undefined) {
            setIsModalOpen(true);
        }
        if (isSuccess && data.email) {
            setCustomerEmail(data.email);
            (async () => {
                const activeSubscriptions = await fetchSubscriptions(data.email);
                setCustomerSubscriptions(activeSubscriptions);
                setIsShowLoader(false);
            })();
        }
    }, [isSuccess, data, success]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);

        if (e.currentTarget.value === 'paypal') {
            payment_method_types.push('paypal');
        }
        fetchCheckoutSession(customerEmail, subscription, payment_method_types);

        setLoading(false);
    };

    const activeSubscriptions = customerSubscriptions.length > 0 && (
        <ActiveSubscriptions subscriptions={customerSubscriptions} />
    );
    const paymentType = isShowPaymentAndCosts && <CustomPaymentBtn callback={handleSubmit} loading={loading} />;

    return (
        <>
            {isShowLoader ? (
                <Spinner />
            ) : (
                <div>
                    {activeSubscriptions}
                    <AccountManagement
                        subscriptions={subscriptions}
                        setIsShowPaymentAndCosts={setIsShowPaymentAndCosts} //callback for radio buttons
                        setSubscription={setSubscription}
                        isSubscriptions={customerSubscriptions.length > 0} //subscriptions for render 'active' payments and for disable type 'personal' in radio accountManagement(radio buttons)
                    />
                    {paymentType}
                    <CheckoutFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} success={success} />
                </div>
            )}
        </>
    );
};

export default CheckoutForm;

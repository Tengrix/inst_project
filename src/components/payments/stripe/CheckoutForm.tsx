import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useGetUserDataQuery } from '@/api/api';
import AccountManagement, { PaymentIntervalType } from '@/pages/profile-settings/account-management/AccountManagement';
import { ActiveSubscriptions } from '@/pages/profile-settings/account-management/activeSubscriptions/ActiveSubscriptions';
import { CustomPaymentBtn } from '@/pages/profile-settings/account-management/customPaymentBtn/CustomPaymentBtn';
import { fetchGetJSON, fetchPostJSON } from '@/shared/utils/stripe/api-helpers';
import getStripe from '@/shared/utils/stripe/get-stripejs';

import { CheckoutFormModal } from './checkoutFormModal/CheckoutFormModal';

type CheckoutFormPropsType = {
    success: boolean | undefined;
    //activateAccountTab: () => void;
};

const CheckoutForm = ({ success /* activateAccountTab */ }: CheckoutFormPropsType) => {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [isShowLoader, setIsShowLoader] = useState(true); //loader

    const [customerEmail, setCustomerEmail] = useState('');
    const [subscriptionCost, setSubscriptionCost] = useState('1000'); //callback for radio buttons
    const [paymentInterval, setPaymentInterval] = useState<PaymentIntervalType>('day'); //callback for radio buttons
    const [isShowPaymentAndCosts, setIsShowPaymentAndCosts] = useState(false); //callback for radio buttons
    const [isModalOpen, setIsModalOpen] = useState(false); //modal for stripe request, callback for CheckoutFormModal
    const [subscriptions, setSubscriptions] = useState([]); //subscriptions for render 'active' payments and for disable type 'personal' in radio accountManagement(radio buttons)

    const { data, isSuccess } = useGetUserDataQuery();

    useEffect(() => {
        if (success !== undefined) {
            setIsModalOpen(true);
        }
        if (isSuccess && data.email) {
            setCustomerEmail(data.email);
        }
        const URL = `/api/get-customer?email=${encodeURIComponent(data?.email as string)}`;

        async function fetchData() {
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                return;
            }

            return response.data[0]?.id;
        }

        async function fetchSubscriptions() {
            const customer = await fetchData();
            setIsShowLoader(true);
            const URL = `/api/get-subscriptions?customer=${customer}`;
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                setIsShowLoader(false);
                return;
            }

            const subscriptions = response.data
                .filter((sub: any) => sub.status === 'active')
                .map((sub: any) => ({
                    billingDate: new Date(sub.current_period_start * 1000).toLocaleDateString(),
                    subscriptionEnd: new Date(sub.current_period_end * 1000).toLocaleDateString(),
                    id: sub.id,
                    status: sub.status
                }));
            setIsShowLoader(false);
            setSubscriptions(subscriptions);
            console.log(subscriptions);
        }
        fetchSubscriptions();
    }, [isSuccess, data, success]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        debugger;
        setLoading(true);
        async function fetchCustomer() {
            const URL = `/api/get-customer?email=${encodeURIComponent(customerEmail as string)}`;
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                console.error(response.message);
                return;
            }

            return response.data[0]?.id;
        }

        if (e.currentTarget.value === 'stripe') {
            console.log('CUSTOMER_EMAIL : ', customerEmail);
            const customerId = await fetchCustomer();
            const response = await fetchPostJSON('/api/checkout-sessions', {
                amount: subscriptionCost,
                interval: paymentInterval,
                customer_email: customerEmail,
                customer: customerId
            });

            if (response.statusCode === 500) {
                console.error(response.message);
                return;
            }

            const stripe = await getStripe();
            const { error } = await stripe!.redirectToCheckout({
                sessionId: response.id
            });
            console.warn(error.message);
        }
        if (e.currentTarget.value === 'paypal') {
            console.log('PAYPAL');
        }
        setLoading(false);
        console.log('CUSTOMER EAMIL : ', customerEmail);
    };

    const activeSubscriptions = subscriptions.length > 0 && <ActiveSubscriptions subscriptions={subscriptions} />;
    const paymentType = isShowPaymentAndCosts && <CustomPaymentBtn callback={handleSubmit} loading={loading} />;

    return (
        <div>
            {activeSubscriptions}
            <AccountManagement
                setIsShowPaymentAndCosts={setIsShowPaymentAndCosts} //callback for radio buttons
                setSubscriptionCost={setSubscriptionCost} //callback for radio buttons
                setPaymentInterval={setPaymentInterval} //callback for radio buttons
                isSubscriptions={subscriptions.length > 0} //subscriptions for render 'active' payments and for disable type 'personal' in radio accountManagement(radio buttons)
            />
            {paymentType}
            <CheckoutFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} success={success} />
        </div>
    );
};

export default CheckoutForm;

import React, { Component, useEffect, useState } from 'react';
import stripe from 'stripe';

import { useGetUserDataQuery } from '@/api/api';
import Table from '@/components/Table/Table';
import { fetchGetJSON } from '@/shared/utils/stripe/api-helpers';
const header = {
    billingDate: 'Date of Payment',
    subscriptionEnd: 'End date of subscription',
    price: 'Price',
    subscriptionType: 'Subscription Type',
    paymentType: 'Payment Type'
};
const payments = [
    {
        billingDate: '18.08.2023',
        subscriptionEnd: '18.08.2023',
        price: 1000,
        subscriptionType: '1 day',
        paymentType: 'Stripe'
    },
    {
        billingDate: '18.08.2023',
        subscriptionEnd: '18.08.2023',
        price: 5000,
        subscriptionType: '7 days',
        paymentType: 'Stripe'
    },
    {
        billingDate: '18.08.2023',
        subscriptionEnd: '18.08.2023',
        price: 10000,
        subscriptionType: '1 month',
        paymentType: 'Stripe'
    },
    {
        billingDate: '18.08.2023',
        subscriptionEnd: '18.08.2023',
        price: 10000,
        subscriptionType: '1 month',
        paymentType: 'PayPal'
    },
    {
        billingDate: '18.08.2023',
        subscriptionEnd: '18.08.2023',
        price: 1000,
        subscriptionType: '1 day',
        paymentType: 'Stripe'
    },
    {
        billingDate: '09.02.2023',
        subscriptionEnd: '10.02.2023',
        price: 5000,
        subscriptionType: '7 days',
        paymentType: 'Stripe'
    },
    {
        billingDate: '20.09.2022',
        subscriptionEnd: '18.10.2022',
        price: 10000,
        subscriptionType: '1 month',
        paymentType: 'Stripe'
    },
    {
        billingDate: '18.08.2022',
        subscriptionEnd: '18.09.2022',
        price: 10000,
        subscriptionType: '1 month',
        paymentType: 'PayPal'
    }
];

const Payments = () => {
    const [customerEmail, setCustomerEmail] = useState('');
    const { data, isSuccess } = useGetUserDataQuery();
    const [customer, setCustomer] = useState({});
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const URL = `/api/get-customer?email=${encodeURIComponent(data?.email as string)}`;
        if (isSuccess && data.email) {
            setCustomerEmail(data.email);
        }
        async function fetchData() {
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                console.error(response.message);
                return;
            }

            return response.data[0].id;
        }

        async function fetchSubscriptions() {
            const customer = await fetchData();

            const URL = `/api/get-subscriptions?customer=${customer}`;
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                console.error(response.message);
                return;
            }

            const subscriptions = response.data.map((sub: any) => ({
                billingDate: new Date(sub.current_period_start * 1000).toLocaleDateString(),
                subscriptionEnd: new Date(sub.current_period_end * 1000).toLocaleDateString(),
                price: sub.items.data[0].plan.amount,
                subscriptionType: sub.items.data[0].plan.interval,
                paymentType: 'Stripe'
            }));
            setSubscriptions(subscriptions);
        }
        fetchSubscriptions();
    }, [isSuccess, data]);

    return <Table data={subscriptions} header={header} />;
};
export default Payments;

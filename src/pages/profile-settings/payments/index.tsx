import React, { Component } from 'react';

import Table from '@/components/Table/Table';
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
    return <Table data={payments} header={header} />;
    /* return <div>TABLE</div>; */
};
export default Payments;

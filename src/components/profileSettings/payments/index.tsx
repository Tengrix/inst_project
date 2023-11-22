import React, { useEffect, useState } from 'react';

import { useGetUserDataQuery } from '@/api/api';
import Table, { TableHeader } from '@/components/Table/Table';
import Spinner from '@/shared/ui/spinner/Spinner';
import { fetchGetJSON } from '@/shared/utils/stripe/api-helpers';

const headers: { [key: string]: TableHeader } = {
    billingDate: { label: 'profileSettings.tab.myPayments.dateOfPayment' },
    subscriptionEnd: { label: 'profileSettings.tab.myPayments.endDateOfSubscription' },
    price: { label: 'profileSettings.tab.myPayments.price' },
    subscriptionType: { label: 'profileSettings.tab.myPayments.subscriptionType' },
    paymentType: { label: 'profileSettings.tab.myPayments.paymentType' }
};

const Payments = () => {
    const [customerEmail, setCustomerEmail] = useState('');
    const { data, isSuccess } = useGetUserDataQuery();
    const [subscriptions, setSubscriptions] = useState([]);
    const [isShowLoader, setIsShowLoader] = useState(true);

    useEffect(() => {
        const URL = `/api/get-customer?email=${encodeURIComponent(data?.email as string)}`;
        if (isSuccess && data.email) {
            setCustomerEmail(data.email);
        }

        async function fetchData() {
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                return;
            }

            return response.data[0].id;
        }

        async function fetchSubscriptions() {
            const customer = await fetchData();
            setIsShowLoader(true);
            const URL = `/api/get-subscriptions?customer=${customer}&status=all`;
            const response = await fetchGetJSON(URL);
            if (response.statusCode === 500) {
                setIsShowLoader(false);
                return;
            }

            const subscriptions = response.data.map((sub: any) => ({
                billingDate: new Date(sub.current_period_start * 1000).toLocaleDateString(),
                subscriptionEnd: new Date(sub.current_period_end * 1000).toLocaleDateString(),
                price: sub.items.data[0].plan.amount,
                subscriptionType: sub.items.data[0].plan.interval,
                paymentType: 'Stripe'
            }));
            setIsShowLoader(false);
            setSubscriptions(subscriptions);
        }

        fetchSubscriptions();
    }, [isSuccess, data]);

    return <>{isShowLoader ? <Spinner /> : <Table data={subscriptions} headers={headers} />}</>;
};
export default Payments;

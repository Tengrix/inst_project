import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useGetUserDataQuery } from '@/api/api';
import AccountManagement from '@/pages/profile-settings/account-management/AccountManagement';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';
import { fetchGetJSON, fetchPostJSON } from '@/shared/utils/stripe/api-helpers';
import getStripe from '@/shared/utils/stripe/get-stripejs';
import PaypalLogo from 'public/assets/icons/paypal-logo.svg';
import StripeLogo from 'public/assets/icons/stripe-logo.svg';

import s from './CheckoutForm.module.scss';

type CheckoutFormPropsType = {
    success: boolean | undefined;
    //activateAccountTab: () => void;
};

const CheckoutForm = ({ success /* activateAccountTab */ }: CheckoutFormPropsType) => {
    const t = useTranslations();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowPaymentAndCosts, setIsShowPaymentAndCosts] = useState(false);
    const [subscriptionCost, setSubscriptionCost] = useState('1000');
    const [paymentInterval, setPaymentIntervalCS] = useState('day');
    const [isShowActiveSubscriptions, setIsShowActiveSubscriptions] = useState(true);

    const [customerEmail, setCustomerEmail] = useState('');
    const { data, isSuccess } = useGetUserDataQuery();
    const [subscriptions, setSubscriptions] = useState([]);
    const [isShowLoader, setIsShowLoader] = useState(true);

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
                console.error(response.message);
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
                console.error(response.message);
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
    const clearQueryString = () => {
        setIsModalOpen(false);
        /* activateAccountTab(); */
        router.push(router.pathname);
    };
    return (
        <div>
            {isShowActiveSubscriptions && (
                <div>
                    <h1 className={s.activeSubscriptionsTitle}>
                        {t('profileSettings.tab.accountManagement.currentSubscription')}
                    </h1>
                    {subscriptions.map((subscription: any) => (
                        <ul key={subscription.id} className={s.activeSubscriptionsList}>
                            <li>
                                <p className={s.activeSubscriptionHeader}>
                                    {t('profileSettings.tab.accountManagement.expireAt')}
                                </p>
                                <p className={s.activeSubscriptionValue}>{subscription.billingDate}</p>
                            </li>
                            <li>
                                <p className={s.activeSubscriptionHeader}>
                                    {t('profileSettings.tab.accountManagement.nextPayment')}
                                </p>
                                <p className={s.activeSubscriptionValue}>{subscription.subscriptionEnd}</p>
                            </li>
                        </ul>
                    ))}
                </div>
            )}

            <AccountManagement
                setIsShowPaymentAndCosts={setIsShowPaymentAndCosts}
                setSubscriptionCost={setSubscriptionCost}
                setPaymentIntervalCS={setPaymentIntervalCS}
                isSubscriptions={subscriptions.length > 0}
            />
            {isShowPaymentAndCosts && (
                <div className={s.checkoutFormButtons}>
                    <button
                        onClick={handleSubmit}
                        className={`${s.paymentButton} ${s.paymentButton_paypal}`}
                        value={'paypal'}
                        type="submit"
                        disabled={loading}>
                        <Image src={PaypalLogo} width={70} height={29} alt="Paypal logo" />
                    </button>
                    {t('profileSettings.tab.accountManagement.paymentChoice')}
                    <button
                        onClick={handleSubmit}
                        className={`${s.paymentButton} ${s.paymentButton_stripe}`}
                        value={'stripe'}
                        type="submit"
                        disabled={loading}>
                        <Image src={StripeLogo} width={70} height={29} alt="Stripe logo" />
                    </button>
                </div>
            )}
            <Modal
                open={isModalOpen}
                modalHandler={clearQueryString}
                customButtonsBlock={
                    success ? (
                        <Button variant="primary" onClick={() => {}}>
                            {t('button.ok')}
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => {}}>
                            {t('button.backToPayment')}
                        </Button>
                    )
                }
                title={success ? t('modal.successTransactionModalTitle') : t('modal.errorTransactionModalTitle')}>
                {success ? t('modal.successTransactionModalDescription') : t('modal.errorTransactionModalDescription')}
            </Modal>
        </div>
    );
};

export default CheckoutForm;

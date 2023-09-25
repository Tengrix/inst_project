import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { AccountManagement } from '@/pages/profile-settings/account-management/AccountManagement';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';
import { fetchPostJSON } from '@/shared/utils/stripe/api-helpers';
import getStripe from '@/shared/utils/stripe/get-stripejs';
import PaypalLogo from 'public/assets/icons/paypal-logo.svg';
import StripeLogo from 'public/assets/icons/stripe-logo.svg';

import s from './CheckoutForm.module.scss';

type CheckoutFormPropsType = {
    success: boolean | undefined;
};

const CheckoutForm = ({ success }: CheckoutFormPropsType) => {
    const [loading, setLoading] = useState(false);
    //const [isModalOpen, setIsOpenModal] = useState(false);
    const [isShowPaymentAndCosts, setIsShowPaymentAndCosts] = useState(false);
    const [subscriptionCost, setSubscriptionCost] = useState('1000');
    const t = useTranslations();
    ///////todo
    let isModalOpen = false;
    const test = success;

    console.log('MODAL USEEFF', success);
    if (success !== undefined) {
        isModalOpen = true;
    }
    //////todo
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);

        if (e.currentTarget.value === 'stripe') {
            const response = await fetchPostJSON('/api/checkout_sessions', {
                amount: subscriptionCost
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
    };

    return (
        <div>
            <AccountManagement
                setIsShowPaymentAndCosts={setIsShowPaymentAndCosts}
                setSubscriptionCost={setSubscriptionCost}
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
                    {'SUCCESS : ' + success}
                </div>
            )}
            {test !== undefined && (
                <Modal
                    open={isModalOpen}
                    modalHandler={() => (isModalOpen = false)}
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
                    {success
                        ? t('modal.successTransactionModalDescription')
                        : t('modal.errorTransactionModalDescription')}
                </Modal>
            )}
        </div>
    );
};

export default CheckoutForm;

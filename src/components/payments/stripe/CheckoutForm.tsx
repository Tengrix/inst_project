import Image from 'next/image';
import React, { useState } from 'react';

import { fetchPostJSON } from '@/shared/utils/stripe/api-helpers';
import getStripe from '@/shared/utils/stripe/get-stripejs';
import PaypalLogo from 'public/assets/icons/paypal-logo.svg';
import StripeLogo from 'public/assets/icons/stripe-logo.svg';

import s from './CheckoutForm.module.scss';

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);

        if (e.currentTarget.value === 'stripe') {
            const response = await fetchPostJSON('/api/checkout_sessions', {
                amount: '1000'
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
        <div className={s.checkoutFormButtons}>
            <button
                onClick={handleSubmit}
                className={`${s.paymentButton} ${s.paymentButton_paypal}`}
                value={'paypal'}
                type="submit"
                disabled={loading}>
                <Image src={PaypalLogo} width={70} height={29} alt="Paypal logo" />
            </button>
            Or
            <button
                onClick={handleSubmit}
                className={`${s.paymentButton} ${s.paymentButton_stripe}`}
                value={'stripe'}
                type="submit"
                disabled={loading}>
                <Image src={StripeLogo} width={70} height={29} alt="Stripe logo" />
            </button>
        </div>
    );
};

export default CheckoutForm;

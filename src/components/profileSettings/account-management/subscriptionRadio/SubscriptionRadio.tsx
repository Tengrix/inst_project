import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { SubscriptionsType, SubscriptionType } from '@/components/profileSettings/payments/stripe/CheckoutForm';
import s from 'src/components/profileSettings/account-management/subscriptionRadio/SubscriptionRadio.module.scss';

export type SubscriptionRadioType = {
    subscriptions: SubscriptionsType;
    setSubscription: (subscription: SubscriptionType) => void;
};

export const SubscriptionRadio = ({ subscriptions, setSubscription }: SubscriptionRadioType) => {
    const t = useTranslations();
    const [currentBusinessAccountCost, setCurrentBusinessAccountCost] = useState(0);

    const businessAccountCostChange = (e: any) => {
        const i = +e.target.value;
        setCurrentBusinessAccountCost(i);
        setSubscription(subscriptions[i]);
    };

    const subscriptionsTypeCosts = subscriptions.map((subscription, i) => {
        return (
            <div className={s.radioBtns} key={subscription.id}>
                <input
                    id={subscription.id}
                    name={subscription.name}
                    type="radio"
                    value={i}
                    onChange={businessAccountCostChange}
                    checked={currentBusinessAccountCost === i}
                />
                <label htmlFor={subscription.id}>{t(subscription.title)}</label>
            </div>
        );
    });
    return (
        <fieldset className={s.radioBtnFieldset}>
            <legend>{t('profileSettings.tab.accountManagement.yourSubscriptionCosts')}</legend>
            <div className={s.businessCostsRadioBtnsBlock}>{subscriptionsTypeCosts}</div>
        </fieldset>
    );
};

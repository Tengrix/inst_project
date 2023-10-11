import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { fetchSubscription } from '@/shared/utils/stripe/api/queries';

import s from './ActiveSubscriptions.module.scss';

type ActiveSubscriptionsPropsType = {
    subscriptions: any;
};

export const ActiveSubscriptions = ({ subscriptions }: ActiveSubscriptionsPropsType) => {
    const t = useTranslations();
    const [customerSubscriptions, setCustomerSubscriptions] = useState(subscriptions);

    const changeSubscription = async (checked: Boolean, id: string) => {
        const subscription = checked ? 'charge_automatically' : 'send_invoice';
        const updatedSubscription = await fetchSubscription(id, subscription);
        const updatedSubscriptions = customerSubscriptions.map((sub: any) => {
            return sub.id === id ? { ...sub, collection_method: updatedSubscription } : sub;
        });
        setCustomerSubscriptions(updatedSubscriptions);
    };

    return (
        <div>
            <h1 className={s.activeSubscriptionsTitle}>
                {t('profileSettings.tab.accountManagement.currentSubscription')}
            </h1>
            {customerSubscriptions.map((subscription: any) => (
                <div key={subscription.id} className={s.activeSubscriptions}>
                    <ul className={s.activeSubscriptionsList}>
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
                    <div className={s.activeSubscriptionCheckbox}>
                        <Checkbox
                            checked={subscription.collection_method === 'charge_automatically'}
                            onChange={checked => changeSubscription(checked, subscription.id)}
                        />
                        <span>{t('profileSettings.tab.accountManagement.autoRenewal')}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

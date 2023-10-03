import { useTranslations } from 'next-intl';

import s from 'src/components/profileSettings/account-management/activeSubscriptions/ActiveSubscriptions.module.scss';

type ActiveSubscriptionsPropsType = {
    subscriptions: any;
};

export const ActiveSubscriptions = ({ subscriptions }: ActiveSubscriptionsPropsType) => {
    const t = useTranslations();

    return (
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
    );
};

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { PaymentIntervalType } from '../AccountManagement';

import s from './SubscriptionRadio.module.scss';

export type SubscriptionRadioType = {
    setSubscriptionCost: (cost: string) => void;
    setPaymentInterval: (interval: PaymentIntervalType) => void;
};

export const SubscriptionRadio = ({ setSubscriptionCost, setPaymentInterval }: SubscriptionRadioType) => {
    const t = useTranslations();
    const [currentBusinessAccountCost, setCurrentBusinessAccountCost] = useState('1000');

    const businessAccountCostChange = (e: any) => {
        setCurrentBusinessAccountCost(e.target.value);
        setSubscriptionCost(e.target.value);
        setPaymentInterval(e.target.getAttribute('data-interval'));
    };
    const businessTypeRadioBts = [
        {
            id: '10$-per-1-day',
            name: '10$-per-1-day',
            value: '1000',
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perDay'),
            interval: 'day'
        },
        {
            id: '50$-per-7-day',
            name: '50$-per-7-day',
            value: '5000',
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perWeek'),
            interval: 'week'
        },
        {
            id: '100$-per-month',
            name: '100$-per-month',
            value: '10000',
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perMonth'),
            interval: 'month'
        }
    ];

    const subscriptionsTypeCosts = businessTypeRadioBts.map(businessCosts => {
        return (
            <div className={s.radioBtns} key={businessCosts.id}>
                <input
                    id={businessCosts.id}
                    name={businessCosts.name}
                    type="radio"
                    data-interval={businessCosts.interval}
                    value={businessCosts.value}
                    onChange={businessAccountCostChange}
                    checked={currentBusinessAccountCost === businessCosts.value}
                />
                <label htmlFor={businessCosts.id}>{businessCosts.title}</label>
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

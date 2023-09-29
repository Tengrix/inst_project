import { useTranslations } from 'next-intl';
import { useEffect, useLayoutEffect, useState } from 'react';

import s from './AccountManagement.module.scss';

type AccountManagementPropsType = {
    setIsShowPaymentAndCosts: (value: boolean) => void;
    setSubscriptionCost: (cost: string) => void;
    setPaymentIntervalCS: (interval: 'day' | 'week' | 'month') => void;
    isSubscriptions: boolean;
};

const AccountManagement = ({
    setIsShowPaymentAndCosts,
    setSubscriptionCost,
    setPaymentIntervalCS,
    isSubscriptions
}: AccountManagementPropsType) => {
    const [currentRadioValue, setCurrentRadioValue] = useState('personal');
    const [currentBusinessAccountCost, setCurrentBusinessAccountCost] = useState('1000');
    const t = useTranslations();

    const accountTypeRadioBts = [
        {
            id: 'personal-account',
            name: 'personal-account',
            value: 'personal',
            title: t('profileSettings.tab.accountManagement.accountTypePersonal')
        },
        {
            id: 'business-account',
            name: 'business-account',
            value: 'business',
            title: t('profileSettings.tab.accountManagement.accountTypeBusiness')
        }
    ];
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

    useEffect(() => {
        if (isSubscriptions) {
            setCurrentRadioValue('business');
        }
    }, [isSubscriptions]);

    const accountTypeChange = (e: any) => {
        setCurrentRadioValue(e.target.value);
        if (e.target.value === 'business') {
            setIsShowPaymentAndCosts(true);
        } else {
            setIsShowPaymentAndCosts(false);
        }
    };
    const businessAccountCostChange = (e: any) => {
        setCurrentBusinessAccountCost(e.target.value);
        setSubscriptionCost(e.target.value);
        setPaymentIntervalCS(e.target.getAttribute('data-interval'));
    };

    const accountTypeBtns = accountTypeRadioBts.map(account => {
        return (
            <div className={s.radioBtns} key={account.id}>
                <input
                    id={account.id}
                    name={account.name}
                    type="radio"
                    value={account.value}
                    onChange={accountTypeChange}
                    checked={currentRadioValue === account.value}
                    disabled={isSubscriptions && account.value === 'personal'}
                />
                <label htmlFor={account.id}>{account.title}</label>
            </div>
        );
    });
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
        <div>
            <fieldset className={s.radioBtnFieldset}>
                <legend>{t('profileSettings.tab.accountManagement.accountType')}</legend>
                <div className={s.accountTypesBtnsBlock}>{accountTypeBtns}</div>
            </fieldset>
            {currentRadioValue === 'business' && (
                <fieldset className={s.radioBtnFieldset}>
                    <legend>{t('profileSettings.tab.accountManagement.yourSubscriptionCosts')}</legend>
                    <div className={s.businessCostsRadioBtnsBlock}>{subscriptionsTypeCosts}</div>
                </fieldset>
            )}
        </div>
    );
};
export default AccountManagement;

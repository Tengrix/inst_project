import { useTranslations } from 'next-intl';
import { useState } from 'react';

import s from './AccountManagement.module.scss';

type AccountManagementPropsType = {
    setIsShowPaymentAndCosts: (value: boolean) => void;
    setSubscriptionCost: (cost: string) => void;
};

export const AccountManagement = ({ setIsShowPaymentAndCosts, setSubscriptionCost }: AccountManagementPropsType) => {
    const [currentRadioValue, setCurrentRadioValue] = useState('personal');
    const [currentBusinessAcountCost, setCurrentBusinessAcountCost] = useState('1000');
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
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perDay')
        },
        {
            id: '50$-per-7-day',
            name: '50$-per-7-day',
            value: '5000',
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perWeek')
        },
        {
            id: '100$-per-month',
            name: '100$-per-month',
            value: '10000',
            title: t('profileSettings.tab.accountManagement.accountTypeBusinessPrice.perMonth')
        }
    ];

    const accountTypeChange = (e: any) => {
        setCurrentRadioValue(e.target.value);
        if (e.target.value === 'business') {
            setIsShowPaymentAndCosts(true);
        } else {
            setIsShowPaymentAndCosts(false);
        }
    };
    const businessAcountCostChange = (e: any) => {
        setCurrentBusinessAcountCost(e.target.value);
        setSubscriptionCost(e.target.value);
    };
    return (
        <div>
            <fieldset className={s.radioBtnFieldset}>
                <legend>{t('profileSettings.tab.accountManagement.accountType')}</legend>
                <div className={s.accountTypesBtnsBlock}>
                    {accountTypeRadioBts.map(account => {
                        return (
                            <div className={s.radioBtns} key={account.id}>
                                <input
                                    id={account.id}
                                    name={account.name}
                                    type="radio"
                                    value={account.value}
                                    onChange={accountTypeChange}
                                    checked={currentRadioValue === account.value}
                                />
                                <label htmlFor={account.id}>{account.title}</label>
                            </div>
                        );
                    })}
                </div>
            </fieldset>
            {currentRadioValue === 'business' && (
                <fieldset className={s.radioBtnFieldset}>
                    <legend className={s.radioBtnLegend}>
                        {t('profileSettings.tab.accountManagement.yourSubscriptionCosts')}
                    </legend>
                    <div className={s.businessCostsRadioBtnsBlock}>
                        {businessTypeRadioBts.map(businessCosts => {
                            return (
                                <div className={s.radioBtns} key={businessCosts.id}>
                                    <input
                                        id={businessCosts.id}
                                        name={businessCosts.name}
                                        type="radio"
                                        value={businessCosts.value}
                                        onChange={businessAcountCostChange}
                                        checked={currentBusinessAcountCost === businessCosts.value}
                                    />
                                    <label htmlFor={businessCosts.id}>{businessCosts.title}</label>
                                </div>
                            );
                        })}
                    </div>
                </fieldset>
            )}
            {currentBusinessAcountCost}
        </div>
    );
};
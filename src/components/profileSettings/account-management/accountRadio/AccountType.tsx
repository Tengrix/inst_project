import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

import s from 'src/components/profileSettings/account-management/accountRadio/AccountTypeRadio.module.scss';

type AccountRadioType = {
    isSubscriptions: boolean;
    setIsShowPaymentAndCosts: (value: boolean) => void;
    currentRadioValue: string;
    setCurrentRadioValue: (value: any) => void;
};

export const AccountRadio = ({
    setIsShowPaymentAndCosts,
    isSubscriptions,
    currentRadioValue,
    setCurrentRadioValue
}: AccountRadioType) => {
    const [currentValue, setCurrentValue] = useState(currentRadioValue);
    const t = useTranslations();
    useState(() => {});

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
    const accountTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value);
        setCurrentRadioValue(e.target.value);
        if (e.target.value === 'business') {
            setIsShowPaymentAndCosts(true);
        } else {
            setIsShowPaymentAndCosts(false);
        }
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
    return (
        <fieldset className={s.radioBtnFieldset}>
            <legend>{t('profileSettings.tab.accountManagement.accountType')}</legend>
            <div className={s.accountTypesBtnsBlock}>{accountTypeBtns}</div>
        </fieldset>
    );
};

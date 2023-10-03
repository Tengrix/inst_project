import Image from 'next/image';
import { useTranslations } from 'next-intl';

import PaypalLogo from 'public/assets/icons/paypal-logo.svg';
import StripeLogo from 'public/assets/icons/stripe-logo.svg';
import s from 'src/components/profileSettings/account-management/customPaymentBtn/CustomPaymentBtn.module.scss';

type CustomPaymentBtnPropsType = {
    loading: boolean;
    callback: (e: any) => void;
};

export const CustomPaymentBtn = ({ loading, callback }: CustomPaymentBtnPropsType) => {
    const t = useTranslations();
    return (
        <div className={s.checkoutFormButtons}>
            <button
                onClick={callback}
                className={`${s.paymentButton} ${s.paymentButton_paypal}`}
                value={'paypal'}
                type="submit"
                disabled={loading}>
                <Image src={PaypalLogo} width={70} height={29} alt="Paypal logo" />
            </button>
            {t('profileSettings.tab.accountManagement.paymentChoice')}
            <button
                onClick={callback}
                className={`${s.paymentButton} ${s.paymentButton_stripe}`}
                value={'stripe'}
                type="submit"
                disabled={loading}>
                <Image src={StripeLogo} width={70} height={29} alt="Stripe logo" />
            </button>
        </div>
    );
};

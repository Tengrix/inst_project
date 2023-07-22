import '@/assets/scss/components/_form.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


export default function PasswordResetForm({action} : {action: string}) {
    const translations = useTranslations();
    const t = (value: string) => translations('forms.' + value);
    const tc = (value: string) => translations('commons.' + value);

    return (
        <form action={action} className='password-reset__form form'>
            <label className='password-reset__label form__label label' htmlFor="email">{t('email')}</label>
            <input className='password-reset__input form__input input' type="email" name="email" required />
            <p className='sign-in__text form__text form__text_help text'>
                {t('password_recovery_message')}
            </p>
            <button className='password-reset__btn form__btn btn btn_submit' type="submit">
                {tc('send_sign_in')}
            </button>
            <p className='sign-in__text form__text text'>
                {t('do_have')}&nbsp;
                <Link className='password-reset__link form__link' href="/sign-in">
                    {tc('sign_in')}
                </Link>
            </p>
        </form>
    )
}

import '@/assets/scss/components/_form.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


export default function SignInForm({action} : {action: string}) {
    const translations = useTranslations();
    const t = (value: string) => translations('forms.' + value);
    const tc = (value: string) => translations('commons.' + value);

    return (
        <form action={action} className='sign-in__form form'>
            <label className='sign-in__label form__label label' htmlFor="username">{t('username')}</label>
            <input className='sign-in__input form__input input' type="text" name="username" required />
            <label className='sign-in__label form__label label' htmlFor="password">{t('password')}</label>
            <input className='sign-in__input form__input input' type="password" name="password" required />
            <p className='sign-in__link form__link'>
                <Link href="/password-reset">
                    {t('forgot_password')}
                </Link>
            </p>
            <button className='sign-in__btn form__btn btn btn_submit' type="submit">
                {tc('sign_in')}
            </button>
            <p className='sign-in__text form__text text'>
                {t('dont_have')}&nbsp;
                <Link href="/sign-up" className='sign-in__link form__link link'>
                    {tc('sign_up')}
                </Link>
            </p>
        </form>
    )
}

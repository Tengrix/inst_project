import '@/assets/scss/components/_form.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


export default function SignInForm({action} : {action: string}) {
    const translations = useTranslations();
    const t = (value: string) => translations('forms.' + value);
    const tc = (value: string) => translations('commons.' + value);

    return (
        <form action={action} className='sign-up__form form'>
            <label className='sign-up__label form__label label' htmlFor="email">{t('email')}</label>
            <input className='sign-up__input form__input input' type="email" name="email" required />
            <label className='sign-up__label form__label label' htmlFor="username">{t('username')}</label>
            <input
                className='sign-up__input form__input input'
                type="text"
                name="username"
                minLength={6}
                maxLength={30}
                required />
            <label className='sign-up__label form__label label' htmlFor="password">{t('password')}</label>
            <input
                className='sign-up__input form__input input'
                type="password"
                name="password"
                minLength={6}
                maxLength={20}
                required />
            <label className='sign-up__label form__label label' htmlFor="password_confirmation">{t('password_confirmation')}</label>
            <input className='sign-up__input form__input input' type="password" name="password_confirmation" required />
            <button className='sign-up__btn form__btn btn btn_submit' type="submit">{tc('sign_up')}</button>
            <p className='sign-up__link form__link'>
                {t('do_have')}&nbsp;
                <Link href="/sign-in">
                    {tc('sign_in')}
                </Link>
            </p>
        </form>
    )
}

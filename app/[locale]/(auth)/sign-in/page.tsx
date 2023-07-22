'use client';

import { useTranslations } from 'next-intl';
import SignInForm from '@/components/pages/auth/SignInForm';


export default function SignInPage() {
    const t = useTranslations('pages.auth.sign_in');

    return (
        <div className='auth__block auth__sign-in sing-in'>
            <h1 className='auth__title title'>{t('h1')}</h1>
            <p className='auth__subtitle subtitle'>{t('welcome_message')}</p>
            <SignInForm action={"#"} />
        </div>
    )
}
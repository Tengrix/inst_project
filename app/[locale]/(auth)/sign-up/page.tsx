'use client';

import { useTranslations } from 'next-intl';
import SignUpForm from '@/components/pages/auth/SignUpForm';


export default function SignUpPage() {
    const t = useTranslations('pages.auth.sign_up');

    return (
        <div className='auth__block auth__sign-up sing-up'>
            <h1 className='auth__title title'>{t('h1')}</h1>
            <p className='auth__subtitle subtitle'>{t('welcome_message')}</p>
            <SignUpForm action={"#"} />
        </div>
    )
}
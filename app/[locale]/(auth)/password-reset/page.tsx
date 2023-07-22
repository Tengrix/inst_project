'use client';

import { useTranslations } from 'next-intl';
import PasswordResetForm from '@/components/pages/auth/PasswordResetForm';


export default function PasswordResetPage() {
    const t = useTranslations('pages.auth.password_reset');

    return (
        <div className='auth__block auth__password-reset password-reset'>
            <h1 className='auth__title title'>{t('h1')}</h1>
            <p className='auth__subtitle subtitle'>{t('welcome_message')}</p>
            <PasswordResetForm action={"#"} />
        </div>
    )
}
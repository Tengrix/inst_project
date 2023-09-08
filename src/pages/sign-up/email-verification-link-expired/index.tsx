import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useReCaptcha } from 'next-recaptcha-v3';
import React from 'react';

import { usePasswordRecoveryMutation } from '@/api/authApiSlice';
import { Button } from '@/shared/ui/button';
import img from 'public/assets/expiredLink.png';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import s from './index.module.scss';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default
        }
    };
}

const EmailVerificationLinkExpired = () => {
    const [resendEmailConfirmation] = usePasswordRecoveryMutation();
    const router = useRouter();
    const { email } = router.query;
    const t = useTranslations('auth');
    const { executeRecaptcha } = useReCaptcha();

    const resendHandler = async () => {
        const captcha = await executeRecaptcha('password_recovery');
        resendEmailConfirmation({ email: email as string, recaptchaValue: captcha });
    };

    return (
        <div className={s.container}>
            <h2>{t('verificationPage.linkExpiredTitle')}</h2>
            <div className={s.body}>{t('verificationPage.verificationText')}</div>
            <div>
                <Button variant="primary" onClick={resendHandler}>
                    {t('button.resendVerificationLink')}
                </Button>
            </div>
            <Image src={img.src} alt="" width={473} height={352} />
        </div>
    );
};

EmailVerificationLinkExpired.getLayout = getLayout;
export default EmailVerificationLinkExpired;

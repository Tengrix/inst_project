import { zodResolver } from '@hookform/resolvers/zod';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createTranslator, useTranslations } from 'next-intl';
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePasswordRecoveryMutation } from '@/api/authApi';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { forgotPasswordSchema } from '@/shared/utils/schemas/forgotPasswordSchema';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import s from './ForgotPassword.module.css';

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`../../../messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });
    return {
        props: {
            messages: messages,
            title: t('auth.forgotPasswordPage.title'),
            metaDescription: t('auth.forgotPasswordPage.meta_description')
        }
    };
}

const ForgotPassword = () => {
    const { push, pathname } = useRouter();
    const [forgotPassword, { status, isLoading }] = usePasswordRecoveryMutation();
    const [, setEmail] = useState('');
    const translationPath = 'auth';
    const t = useTranslations(translationPath);

    const { executeRecaptcha } = useReCaptcha();

    const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema)
    });
    const onSubmit = handleSubmit(async data => {
        const captcha = await executeRecaptcha('password_recovery');
        forgotPassword({ email: data.email, recaptchaValue: captcha as string });
        setEmail(data.email);
    });

    useEffect(() => {
        status === 'fulfilled' && push(pathname + '/link-has-been-sent');
    }, [status]);

    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}>
            <div className={s.container}>
                <Card className={s.card}>
                    <Typography variant={'large'}>{t('forgotPasswordPage.h1')}</Typography>
                    <form onSubmit={onSubmit}>
                        <ControlledTextField
                            control={control}
                            translation={translationPath}
                            name={'email'}
                            label={t('form.email')}
                            className={s.email}
                        />
                        <Typography variant={'regular14'} className={s.subtitle}>
                            {t('forgotPasswordPage.enterYourEmailText')}
                        </Typography>
                        <Button type={'submit'} fullWidth className={s.registerBtn}>
                            {t('button.sendLink')}
                        </Button>
                    </form>
                    <Link className={s.link} href={'/sign-in'}>
                        {t('button.backToSignIn')}
                    </Link>
                </Card>
            </div>
        </ReCaptchaProvider>
    );
};

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

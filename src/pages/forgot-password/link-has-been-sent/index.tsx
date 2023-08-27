import { zodResolver } from '@hookform/resolvers/zod';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePasswordRecoveryMutation } from '@/api/authApi';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { registerSchema } from '@/shared/utils/schemas/registerSchema';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import s from 'src/pages/forgot-password/link-has-been-sent/LinkHasBeenSent.module.css';

export type RegisterFormType = z.infer<typeof registerSchema>;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default
        }
    };
}

const LinkHasBeenSent = () => {
    const [passwordRecovery] = usePasswordRecoveryMutation();

    const { control, handleSubmit } = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = handleSubmit(async data => {
        const captcha = await executeRecaptcha('password_recovery');
        passwordRecovery({ email: data.email, recaptchaValue: captcha as string });
    });
    const t = useTranslations('auth');
    const { executeRecaptcha } = useReCaptcha();

    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}>
            <div className={s.container}>
                <Card className={s.card}>
                    <Typography variant={'large'}>{t('forgotPasswordPage.h1')}</Typography>
                    <form onSubmit={onSubmit}>
                        <ControlledTextField
                            control={control}
                            name={'email'}
                            label={t('form.email')}
                            className={s.email}
                        />
                    </form>
                    <Typography variant={'regular14'} className={s.subtitle}>
                        {t('forgotPasswordPage.enterYourEmailText')}
                    </Typography>
                    <Typography variant={'regular14'} className={s.description}>
                        {t('forgotPasswordPage.linkHasBeenSentText')}
                    </Typography>
                    <Button type={'submit'} fullWidth className={s.registerBtn}>
                        {t('button.sendLinkAgain')}
                    </Button>

                    <Link className={s.link} href={'/sign-in'}>
                        {t('button.backToSignIn')}
                    </Link>
                </Card>
            </div>
        </ReCaptchaProvider>
    );
};

LinkHasBeenSent.getLayout = getLayout;
export default LinkHasBeenSent;

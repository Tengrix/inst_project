import {getLayout} from 'src/components/Layout/BaseLayout/BaseLayout';
import {useForm} from 'react-hook-form';
import {Card} from '@/shared/ui/card';
import {Typography} from '@/shared/ui/typography';
import {Button} from '@/shared/ui/button';
import {registerSchema} from '@/shared/utils/schemas/registerSchema';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ControlledTextField} from '@/shared/ui/controlled';
import s from 'src/pages/forgot-password/link-has-been-sent/LinkHasBeenSent.module.css';
import {useTranslations} from 'next-intl';
import {GetStaticPropsContext} from 'next';
import {usePasswordRecoveryMutation} from '@/api/authApi';
import {ReCaptcha, ReCaptchaProvider, useReCaptcha} from "next-recaptcha-v3";
import {useState} from "react";

export type RegisterFormType = z.infer<typeof registerSchema>;
type RegisterFormPropsType = {
    linkPath: string;
    onSubmitHandler: (data: RegisterFormType) => void;
};

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default,
        },
    };
}

const LinkHasBeenSent = () => {
    const [passwordRecovery] = usePasswordRecoveryMutation();
    const [token, setToken] = useState<string|null>(null);

    const {control, handleSubmit} = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = handleSubmit(async (data) => {
        const captcha = await executeRecaptcha('password_recovery')
        passwordRecovery({email:data.email, recaptchaValue:captcha as string});
    });
    const t = useTranslations('auth');
    const {executeRecaptcha} = useReCaptcha()

    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}>
        <div className={s.container}>
            <Card className={s.card}>
                <Typography variant={'large'}>{t('forgotPasswordPage.title')}</Typography>
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

                <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
                    {t('button.backToSignIn')}
                </Button>
            </Card>
            <ReCaptcha onValidate={setToken} action="password-recovery" />
        </div>
        </ReCaptchaProvider>
    );
};

LinkHasBeenSent.getLayout = getLayout;
export default LinkHasBeenSent;

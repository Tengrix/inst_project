import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useForm } from 'react-hook-form';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '@/shared/ui/controlled';
import s from './ForgotPassword.module.css';
import { Captcha } from '@/shared/captcha/Captcha';
import { usePasswordRecoveryMutation } from '@/api/authApi';
import { forgotPasswordSchema } from '@/shared/utils/schemas/forgotPasswordSchema';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';
import { TextArea } from '@/shared/ui/text-area';
import { useRouter } from 'next/router';


export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}/auth.json`)).default,
    },
  };
}

const ForgotPassword = () => {
  const { push, pathname } = useRouter();
  const [forgotPassword, { status }] = usePasswordRecoveryMutation();
  const [email, setEmail] = useState('');

  const t = useTranslations('auth');

  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = handleSubmit((data) => {
    forgotPassword(data);
    setEmail(data.email);
  });

  const [buttonSendLinkDisabled, setIsButtonSendLinkDisabled] = useState(true);
  const changeCaptchaValue = (captchIsDone: boolean) => {
    setIsButtonSendLinkDisabled(captchIsDone);
  };
  useEffect(() => {
    status === 'fulfilled' && push(pathname + '/link-has-been-sent');
  }, [status]);

  return (
    <>
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
            <Typography variant={'body2'} className={s.subtitle}>
              {t('forgotPasswordPage.enterYourEmailText')}
            </Typography>
            <Button
              type={'submit'}
              fullWidth
              className={s.registerBtn}
              //disabled={buttonSendLinkDisabled}
            >
              {t('button.sendLink')}
            </Button>
          </form>
          <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
            {t('button.backToSignIn')}
          </Button>
          <Captcha changeCaptchaValue={changeCaptchaValue} />
        </Card>
      </div>
    </>
  );
};

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

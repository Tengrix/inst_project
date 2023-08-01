import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useForm } from 'react-hook-form';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { registerSchema } from '@/shared/utils/schemas/register-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '@/shared/ui/controlled';
import s from './ForgotPassword.module.css';
import { Captcha } from '@/shared/captcha/Captcha';
import { useForgotPasswordMutation } from '@/api/authApi';
import { forgotPasswordSchema } from '@/shared/utils/schemas/forgotPasswordSchema';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
type ForgotPasswordFormPropsType = {
  linkPath: string;
  onSubmitHandler: (data: ForgotPasswordFormType) => void;
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}/auth.json`)).default,
    },
  };
}

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmitHandler = (data: ForgotPasswordFormType) => console.log(data);

  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    //onSubmitHandler(data); ???
    forgotPassword(data);
  });
  const t = useTranslations('auth');

  const [buttonSendLinkDisabled, setIsButtonSendLinkDisabled] = useState(true);
  const changeCaptchaValue = (captchIsDone: boolean) => {
    setIsButtonSendLinkDisabled(captchIsDone);
  };

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
              disabled={buttonSendLinkDisabled}
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

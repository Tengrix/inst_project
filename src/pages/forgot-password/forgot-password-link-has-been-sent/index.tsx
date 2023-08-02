import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useForm } from 'react-hook-form';
/* import EmailSentModal from 'src/styles/styledComponents/Modal/EmailSentModal'; */
import { useState } from 'react';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { registerSchema } from '@/shared/utils/schemas/register-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '@/shared/ui/controlled';
import s from './ForgotPasswordLinkHasBeenSent.module.css';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';
import { usePasswordRecoveryMutation } from '@/api/authApi';

export type RegisterFormType = z.infer<typeof registerSchema>;
type RegisterFormPropsType = {
  linkPath: string;
  onSubmitHandler: (data: RegisterFormType) => void;
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}/auth.json`)).default,
    },
  };
}

const ForgotPasswordLinkHasBeenSent = () => {
  const [passwordRecovery] = usePasswordRecoveryMutation();
  const onSubmitHandler = (data: RegisterFormType) => console.log(data);
  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    passwordRecovery(data);
  });
  const t = useTranslations('auth');

  return (
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
        <Typography variant={'body2'} className={s.subtitle}>
          {t('forgotPasswordPage.enterYourEmailText')}
        </Typography>
        <Typography variant={'body2'} className={s.description}>
          {t('forgotPasswordPage.linkHasBeenSentText')}
        </Typography>
        <Button type={'submit'} fullWidth className={s.registerBtn}>
          {t('button.sendLinkAgain')}
        </Button>

        <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
          {t('button.backToSignIn')}
        </Button>
      </Card>
    </div>
  );
};

ForgotPasswordLinkHasBeenSent.getLayout = getLayout;
export default ForgotPasswordLinkHasBeenSent;

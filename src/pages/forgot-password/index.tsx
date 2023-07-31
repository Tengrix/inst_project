import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useForm } from 'react-hook-form';
import { useSignUpMutation } from 'api/authApi';
import EmailSentModal from 'src/styles/styledComponents/Modal/EmailSentModal';
import { useState } from 'react';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { registerSchema } from '@/shared/utils/schemas/register-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '@/shared/ui/controlled';
import s from './ForgotPassword.module.css';
import { TextArea } from '@/shared/ui/text-area';
import { Captcha } from '@/shared/captcha/Captcha';
import { useRouter } from 'next/router';
import { en } from 'locales/en';
import { ru } from 'locales/ru';
import { useTranslation } from './hooks/useTranslation';

export type RegisterFormType = z.infer<typeof registerSchema>;
type RegisterFormPropsType = {
  linkPath: string;
  onSubmitHandler: (data: RegisterFormType) => void;
};

const ForgotPassword = () => {
  /*   const [showForgotModal, setShowForgotModal] = useState(false);
  const [signUp] = useSignUpMutation();
  const onSubmitHandler = (data: RegisterFormType) => console.log(data); */
  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = handleSubmit((data) => {});

  const { t } = useTranslation();

  return (
    <>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography variant={'large'}>{t.auth.forgotPasswordPage.title}</Typography>
          <form onSubmit={onSubmit}>
            <ControlledTextField
              control={control}
              name={'email'}
              label={'Email'}
              className={s.email}
            />
            <Typography variant={'body2'} className={s.subtitle}>
              {t.auth.forgotPasswordPage.enterYourEmailText}
            </Typography>
            <Button type={'submit'} fullWidth className={s.registerBtn}>
              {t.auth.form.button.sendLink}
            </Button>
          </form>
          <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
            {t.auth.form.button.backToSignIn}
          </Button>
          <Captcha />
          {/* TODO */}
        </Card>
      </div>
    </>
  );
};

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

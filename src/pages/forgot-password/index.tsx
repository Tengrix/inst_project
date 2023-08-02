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
import { usePasswordRecoveryMutation} from '@/api/authApi';
import { forgotPasswordSchema } from '@/shared/utils/schemas/forgotPasswordSchema';
import { useState } from 'react';
import {useTranslation} from "@/shared/hooks/useTranslation";

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
type ForgotPasswordFormPropsType = {
  linkPath: string;
  onSubmitHandler: (data: ForgotPasswordFormType) => void;
};

const ForgotPassword = () => {
  const [forgotPassword] = usePasswordRecoveryMutation();
  const onSubmitHandler = (data: ForgotPasswordFormType) => console.log(data);

  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    //onSubmitHandler(data); ???
    forgotPassword(data);
  });

  const { t } = useTranslation();
  //
  const [buttonSendLinkDisabled, setIsButtonSendLinkDisabled] = useState(true);
  const changeCaptchaValue = (captchIsDone: boolean) => {
    setIsButtonSendLinkDisabled(captchIsDone);
  };

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
            <Button
              type={'submit'}
              fullWidth
              className={s.registerBtn}
              disabled={buttonSendLinkDisabled}
            >
              {t.auth.form.button.sendLink}
            </Button>
          </form>
          <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
            {t.auth.form.button.backToSignIn}
          </Button>
          <Captcha changeCaptchaValue={changeCaptchaValue} />
        </Card>
      </div>
    </>
  );
};

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

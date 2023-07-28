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
import Head from 'next/head';

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
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    /* onSubmitHandler(data);
    setShowForgotModal(true);
    signUp(data); */
  });

  return (
    <>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography variant={'large'}>Forgot Password</Typography>
          <form onSubmit={onSubmit}>
            <ControlledTextField
              control={control}
              name={'email'}
              label={'Email'}
              className={s.email}
            />
            <Typography variant={'body2'} className={s.subtitle}>
              Enter your email address and we will send you further instructions
            </Typography>
            <Button type={'submit'} fullWidth className={s.registerBtn}>
              Send Link
            </Button>
          </form>
          <Button as={'a'} variant={'link'} className={s.link} href={'/sign-in'}>
            Back to Sign In
          </Button>
          {/* TODO */}
          {/* library : react-google-recaptcha-v3 //////// https://javascript.plainenglish.io/how-to-implement-google-recaptcha-v3-in-next-js-b1436e68c70a */}
        </Card>
        {/* <EmailSentModal handleClose={() => setShowForgotModal(false)} show={showForgotModal} /> */}
      </div>
    </>
  );
};

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

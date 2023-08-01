import {getLayout} from 'src/components/Layout/BaseLayout/BaseLayout';
import {useForm} from 'react-hook-form';
import {Card} from '@/shared/ui/card';
import {Typography} from '@/shared/ui/typography';
import {Button} from '@/shared/ui/button';
import {registerSchema} from '@/shared/utils/schemas/register-schema';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ControlledTextField} from '@/shared/ui/controlled';
import s from './ForgotPassword.module.css';
import {Captcha} from '@/shared/captcha/Captcha';
import {useTranslation} from './hooks/useTranslation';
import {useSignUpMutation} from "@/api/authApi";

export type RegisterFormType = z.infer<typeof registerSchema>;
type RegisterFormPropsType = {
  linkPath: string;
  onSubmitHandler: (data: RegisterFormType) => void;
};

const ForgotPassword = () => {

  const [signUp] = useSignUpMutation();

  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit((data) => {


  })


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

import { useLoginMutation } from "@/api/authApi";
import classes from "@/pages/sign-in/SignIn.module.scss";
import { Button } from "@/shared/ui/button";
import { ControlledTextField } from "@/shared/ui/controlled";
import { Typography } from "@/shared/ui/typography";
import { loginSchema } from "@/shared/utils/schemas/login-schema";
import Link from "next/link";
import { Github } from "public/icon/github-logo";
import { Google } from "public/icon/google-logo";
import { useForm } from "react-hook-form";
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useTranslations } from 'next-intl';
import { z } from "zod";


export type LoginFormType = z.infer<typeof loginSchema>

type LoginFormPropsType = {
    linkPath: string
    onSubmitHandler: (data: LoginFormType) => void
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}/auth.json`)).default,
    },
  };
}

const SignIn = () => {
    const [signIn] = useLoginMutation();
    const t = useTranslations('auth');
    const onSubmitHandler = (data: LoginFormType) => console.log(data);
    const {control, handleSubmit} = useForm<LoginFormType>();
    const onSubmit = handleSubmit(data => {
        onSubmitHandler(data);
        signIn({password: data.password, login: data.userName});
    })

    return (
        <div className={classes.signInForm}>
            <div className={classes.header}>
                <Typography variant="h1" as="h1" className={classes.header__title}>
                    {t('signInPage.title')}
                </Typography>
                <div className={classes.header__icons}>
                    <Button as={'a'} variant={'link'}>
                        <Google width={36} height={36}/>
                    </Button>
                    <Button as={'a'} variant={'link'}>
                        <Github width={36} height={36}/>
                    </Button>
                </div>
            </div>
            <form className={classes.form} onSubmit={onSubmit}>
                <ControlledTextField control={control} name={'email'} label={'Email'} />
                <ControlledTextField control={control} name={'password'} label={'Password'} type={'password'} />
                <Link href={'/forgot-password'} className={classes.form__forgot}>
                    {t('signInPage.forgotPassword')}?
                </Link>
                <Button type={'submit'} fullWidth>
                    {t('form.button.signInButton')}
                </Button>
            </form>
            <div className={classes.footer}>
                <Typography>
                    {t('signInPage.question')}
                </Typography>
                <Link href={'/sign-up'} className={classes.link}>
                    {t('signUpPage.title')}
                </Link>
            </div>
        </div>
    )
}

SignIn.getLayout = getLayout
export default SignIn;

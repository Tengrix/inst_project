import {CustomerError, useLoginMutation} from "@/api/authApi";
import classes from "@/pages/sign-in/SignIn.module.scss";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ControlledTextField } from "@/shared/ui/controlled";
import { Typography } from "@/shared/ui/typography";
import {LoginFormType, loginSchema} from "@/shared/utils/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTranslator, useTranslations } from 'next-intl';
import Link from "next/link";
import { GetStaticPropsContext } from "next/types";
import { Github } from "public/icon/github-logo";
import { Google } from "public/icon/google-logo";
import { useForm } from "react-hook-form";
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {authAction} from "@/redux/store/Auth/authSlice";


export async function getStaticProps({ locale='en' }: GetStaticPropsContext) {
    const messages = (await import(`../../../messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('auth.signInPage.title'),
            metaDescription: t('auth.signInPage.meta_description')
        },
    };
}

const SignIn = () => {
    const [signIn, {error,isLoading, data, isError}] = useLoginMutation();
    const translationPath = 'auth';
    const router = useRouter()
    const t = useTranslations(translationPath);
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm<LoginFormType>({ resolver: zodResolver(loginSchema) });
    const onSubmit = handleSubmit(data => {
        signIn({ password: data.password, login: data.userName })
            .unwrap()
            .then(()=> dispatch(authAction.setAuth(true)))
    })

    if(data && data.message==='Success'){
        router.push('/profile')
    }

    const err = error && 'data' in error ? (error as CustomerError ).data.errorsMessages : 'Something went wrong'


    return (
        <div className={classes.container}>
            <Card className={classes.signInForm}>
                <div className={classes.header}>
                    <Typography variant="h1" as="h1" className={classes.header__title}>
                        {t('signInPage.h1')}
                    </Typography>
                    <div className={classes.header__icons}>
                        <Button as={'a'} variant={'link'}>
                            <Google width={36} height={36} />
                        </Button>
                        <Button as={'a'} variant={'link'}>
                            <Github width={36} height={36} />
                        </Button>
                    </div>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <ControlledTextField control={control} translation={translationPath} name={'userName'} label={'Username'} />
                    <ControlledTextField control={control} translation={translationPath} name={'password'} label={'Password'} type={'password'} />
                    <Link href={'/forgot-password'} className={classes.form__forgot}>
                        {t('signInPage.forgotPassword')}?
                    </Link>
                    <Button isLoading={isLoading} type={'submit'} disabled={isLoading} className={classes.form__btn} fullWidth>
                        {t('button.signInButton')}
                    </Button>
                    <div className={classes.form__error}>
                        {isError && err}
                    </div>
                </form>
                <div className={classes.footer}>
                    <Typography>
                        {t('signInPage.question')}
                    </Typography>
                    <Link href={'/sign-up'} className={classes.link}>
                        {t('signUpPage.h1')}
                    </Link>
                </div>
            </Card>
        </div>
    )
}

SignIn.getLayout = getLayout
export default SignIn;

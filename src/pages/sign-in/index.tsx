import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next/types';
import { signIn as signInWithProvider, useSession } from 'next-auth/react';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useLoginWithProviderMutation, useLoginMutation } from '@/api/authApiSlice';
import classes from '@/pages/sign-in/SignIn.module.scss';
import { useAppSelector } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { Routes } from '@/shared/routes/Routes';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { LoginFormType, loginSchema } from '@/shared/utils/schemas/loginSchema';
import { Github } from 'public/icon/github-logo';
import { Google } from 'public/icon/google-logo';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('auth.signInPage.title'),
            metaDescription: t('auth.signInPage.meta_description')
        }
    };
}

const translationPath = 'auth';

const SignIn = ({ messages }: { messages: {} }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useAppSelector(state => state.auth);
    const [signIn, { isLoading, isError }] = useLoginMutation();
    const [authWithProvider] = useLoginWithProviderMutation();
    const t = useTranslations(translationPath);
    const [loginErr, setLoginErr] = useState(t('error.incorrectUsernameOrPasswordError'));
    const { data: session } = useSession();

    useEffect(() => {
        console.log(session);
        if (session?.accessToken) {
            authWithProvider({ provider: session.provider, token: session.accessToken })
                .unwrap()
                .then(res => {
                    dispatch(authAction.setCredentials(res));
                })
                .catch(() => {
                    setLoginErr(t('error.incorrectUsernameOrPasswordError'));
                });
        }
    }, [session]);

    const { control, formState, handleSubmit } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    useEffect(() => {
        if (token) {
            router.push(Routes.PROFILE);
        }
        setLoginErr(t('error.incorrectUsernameOrPasswordError'));
    }, [token, messages, t]);

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        try {
            const userData = await signIn({ password: data.password, login: data.userName }).unwrap();
            dispatch(authAction.setCredentials(userData));
        } catch (err) {
            /*  console.log(err);
            if (isFetchBaseQueryError(err)) {
            setLoginErr(t('error.incorrectUsernameOrPasswordError'));
            } else {
            setLoginErr((err as CustomerError).data.errorsMessages);
            } */
            setLoginErr(t('error.incorrectUsernameOrPasswordError'));
        }
    });

    return (
        <div className={classes.container}>
            <Card className={classes.signInForm}>
                <div className={classes.header}>
                    <Typography variant="h1" as="h1" className={classes.header__title}>
                        {t('signInPage.h1')}
                    </Typography>
                    <div className={classes.header__icons}>
                        <Button as={'a'} variant={'link'} onClick={() => signInWithProvider('google')}>
                            <Google width={36} height={36} />
                        </Button>
                        <Button as={'a'} variant={'link'} onClick={() => signInWithProvider('github')}>
                            <Github width={36} height={36} />
                        </Button>
                    </div>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <ControlledTextField
                        control={control}
                        translation={translationPath}
                        name={'userName'}
                        label={t('form.username')}
                    />
                    <ControlledTextField
                        control={control}
                        translation={translationPath}
                        name={'password'}
                        label={t('form.password')}
                        type={'password'}
                    />
                    <Link href={'/forgot-password'} className={classes.form__forgot}>
                        {t('signInPage.forgotPassword')}?
                    </Link>
                    <Button
                        isLoading={isLoading}
                        type={'submit'}
                        disabled={!formState.isValid || isLoading}
                        className={classes.form__btn}
                        fullWidth>
                        {t('button.signInButton')}
                    </Button>
                    <div className={classes.form__error}>{isError && loginErr}</div>
                </form>
                <div className={classes.footer}>
                    {/*<Checkbox label={'Trust This Device'} checked={trustDevice} onChange={checkDevice} />*/}
                    <Typography>{t('signInPage.question')}</Typography>
                    <Link href={'/sign-up'} className={classes.link}>
                        {t('signUpPage.h1')}
                    </Link>
                </div>
            </Card>
        </div>
    );
};

SignIn.getLayout = getLayout;
export default SignIn;

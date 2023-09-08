import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next/types';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSignUpMutation } from '@/api/authApiSlice';
import EmailSentModal from '@/pages/sign-up/email-sent-modal/email-sent-modal';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { registerSchema } from '@/shared/utils/schemas/registerSchema';
import { Github } from 'public/icon/github-logo';
import { Google } from 'public/icon/google-logo';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import s from './SignUp.module.scss';

export type RegisterFormType = z.infer<typeof registerSchema>;

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`../../../messages/${locale}/auth.json`)).default;
    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('auth.signUpPage.title'),
            metaDescription: t('auth.signUpPage.meta_description')
        }
    };
}

const SignUp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const translationPath = 'auth';
    const t = useTranslations(translationPath);
    const [email, setEmail] = useState<string>('');
    const [signUp, { error, isLoading }] = useSignUpMutation();

    const { control, handleSubmit, formState } = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });
    // const privacyError = formState.errors.serviceAndPrivacy?.message;

    const onSubmit = handleSubmit(data => {
        signUp(data)
            .unwrap()
            .then(() => {
                setIsModalOpen(true);
            });
        setEmail(data.email);
    });

    // const err =
    //     error &&
    //     (error as SignUpErrorType).data.errorsMessages.reduce((acc: { [key: string]: string }, error) => {
    //         acc[error.field] = error.message;
    //         return acc;
    //     }, {});
    // const errorHandler = (error: string) => {
    //     return (
    //         err &&
    //         err[error] && (
    //             <Typography variant={'error'} color={'error'} style={{ textAlign: 'start' }}>
    //                 {err[error]}
    //             </Typography>
    //         )
    //     );
    // };

    // if (isLoading) return <h2>...Loading</h2>

    const parseTranslation = (str: any) => {
        const links: Array<any> = str.split(/<a(.*?)>.*?<\/a>/);
        const matchLinks = str.matchAll(/<a(.*?)>(.*?)<\/a>/g);
        for (const link of matchLinks) {
            const [, attr, value] = link;
            const href = (attr.match(/href='(.*?)'/) ?? [])[1];
            const i = links.indexOf(attr);
            if (i) {
                links[i] = (
                    <Link href={href} className={s.link + ' ' + s.link_underline}>
                        {value}
                    </Link>
                );
            }
        }

        return links;
    };

    return (
        <div className={s.container}>
            {!isModalOpen && (
                <Card className={s.card}>
                    <Typography variant={'h1'}>{t('signUpPage.h1')}</Typography>
                    <div className={s.iconContainer}>
                        <Button as={'a'} variant={'link'} className={s.link}>
                            <Google width={36} height={36} />
                        </Button>
                        <Button as={'a'} variant={'link'} className={s.link}>
                            <Github width={36} height={36} />
                        </Button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <ControlledTextField
                            control={control}
                            translation={translationPath}
                            name={'userName'}
                            label={t('form.username')}
                            className={s.email}
                        />
                        {/*{errorHandler('login')}*/}
                        <ControlledTextField
                            control={control}
                            translation={translationPath}
                            name={'email'}
                            label={t('form.email')}
                            className={s.email}
                        />
                        {/*{errorHandler('email')}*/}
                        <ControlledTextField
                            control={control}
                            translation={translationPath}
                            name={'password.password'}
                            label={t('form.password')}
                            className={s.password}
                            type={'password'}
                        />
                        <ControlledTextField
                            control={control}
                            translation={translationPath}
                            name={'password.confirmPassword'}
                            label={t('form.confirmPassword')}
                            className={s.confirmPassword}
                            type={'password'}
                        />
                        <div className={s.privacyBlock}>
                            <ControlledCheckbox name={'serviceAndPrivacy'} control={control} label={``} />

                            <Typography variant={'small'} className={s.privacyText}>
                                {parseTranslation(t.raw('signUpPage.privacyTerms'))}
                            </Typography>
                            {/*<Typography variant={'error'} color={'error'}>*/}
                            {/*    {privacyError && t(privacyError)}*/}
                            {/*</Typography>*/}
                        </div>

                        <Button
                            type={'submit'}
                            fullWidth
                            className={s.registerBtn}
                            disabled={!formState.isValid || isLoading}
                            isLoading={isLoading}>
                            {t('button.signUpButton')}
                        </Button>
                    </form>
                    <Typography variant={'regular14'} className={s.subtitle}>
                        {t('signUpPage.question')}
                    </Typography>
                    <Link className={s.link} href={'/sign-in'}>
                        {t('signInPage.h1')}
                    </Link>
                </Card>
            )}
            <EmailSentModal email={email} isOpen={isModalOpen} title={'Email sent'} modalHandler={setIsModalOpen} />
        </div>
    );
};

SignUp.getLayout = getLayout;
export default SignUp;

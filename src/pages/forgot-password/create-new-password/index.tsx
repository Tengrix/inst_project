import { zodResolver } from '@hookform/resolvers/zod';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useResetPasswordMutation } from '@/api/authApiSlice';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { createNewPasswordSchema } from '@/shared/utils/schemas/createNewPasswordSchema';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import s from 'src/pages/forgot-password/create-new-password/CreateNewPassword.module.scss';

export type RegisterFormType = z.infer<typeof createNewPasswordSchema>;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default
        }
    };
}

const CreateNewPassword = () => {
    const router = useRouter();
    const [setNewPassword] = useResetPasswordMutation();
    const { control, handleSubmit } = useForm<RegisterFormType>({ resolver: zodResolver(createNewPasswordSchema) });
    const onSubmit = handleSubmit(data => {
        setNewPassword({ newPassword: data.password, recoveryCode: router.query.recoveryCode as string });
    });
    const t = useTranslations('auth');

    return (
        <div className={s.container}>
            <Card className={s.card}>
                <Typography variant={'large'}>{t('createNewPassword.h1')}</Typography>

                <form onSubmit={onSubmit}>
                    <ControlledTextField
                        control={control}
                        name={'password'}
                        label={t('form.password')}
                        className={s.password}
                        type={'password'}
                    />
                    <ControlledTextField
                        control={control}
                        name={'confirmPassword'}
                        label={t('form.confirmPassword')}
                        className={s.confirmPassword}
                        type={'password'}
                    />
                    <Typography variant={'regular14'} className={s.subtitle}>
                        {t('form.passwordRule')}
                    </Typography>
                    <Button type={'submit'} fullWidth className={s.btn}>
                        {t('createNewPassword.h1')}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

CreateNewPassword.getLayout = getLayout;
export default CreateNewPassword;

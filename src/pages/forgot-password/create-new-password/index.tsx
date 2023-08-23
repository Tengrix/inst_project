import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Typography } from '@/shared/ui/typography';
import { createNewPasswordSchema } from '@/shared/utils/schemas/createNewPasswordSchema';
import { useResetPasswordMutation } from 'src/api/authApi';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import s from 'src/pages/forgot-password/create-new-password/CreateNewPassword.module.scss';

export type RegisterFormType = z.infer<typeof createNewPasswordSchema>;

const SignUp = () => {
    const [setNewPassword] = useResetPasswordMutation();
    const { control, handleSubmit } = useForm<RegisterFormType>({ resolver: zodResolver(createNewPasswordSchema) });
    const onSubmit = handleSubmit(data => {
        setNewPassword({ newPassword: data.password, recoveryCode: '' });
    });

    return (
        <div className={s.container}>
            <Card className={s.card}>
                <Typography variant={'large'}>Create New Password</Typography>

                <form onSubmit={onSubmit}>
                    <ControlledTextField
                        control={control}
                        name={'password'}
                        label={'Password'}
                        className={s.password}
                        type={'password'}
                    />
                    <ControlledTextField
                        control={control}
                        name={'confirmPassword'}
                        label={'Confirm password'}
                        className={s.confirmPassword}
                        type={'password'}
                    />
                    <Typography variant={'regular14'} className={s.subtitle}>
                        Your password must be between 6 and 20 characters
                    </Typography>
                    <Button type={'submit'} fullWidth className={s.btn}>
                        Create new password
                    </Button>
                </form>
            </Card>
        </div>
    );
};

SignUp.getLayout = getLayout;
export default SignUp;

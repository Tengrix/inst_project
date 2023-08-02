import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import {useForm} from "react-hook-form";
import {useResetPasswordMutation} from "src/api/authApi";
import {Card} from "@/shared/ui/card";
import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextField} from "@/shared/ui/controlled";
import s from "src/pages/forgot-password/create-new-password/CreateNewPassword.module.scss"
import {createNewPasswordSchema} from "@/shared/utils/schemas/createNewPasswordSchema";

export type RegisterFormType = z.infer<typeof createNewPasswordSchema>



const SignUp = () => {
    const [setNewPassword] = useResetPasswordMutation()
    const {control, handleSubmit} = useForm<RegisterFormType>({resolver: zodResolver(createNewPasswordSchema)})
    const onSubmit = handleSubmit(data => {
        setNewPassword({newPassword: data.password, recoveryCode: ''})
    })


    return (
        <div className={s.container}>
            <Card className={s.card}>
                <Typography variant={"large"}>
                    Create New Password
                </Typography>

                <form onSubmit={onSubmit}>
                    <ControlledTextField control={control} name={'password'} label={'Password'} className={s.password}
                                         type={'password'}
                    />
                    <ControlledTextField control={control} name={'confirmPassword'} label={'Confirm password'}
                                         className={s.confirmPassword}
                                         type={'password'}
                    />
                    <Typography variant={'body2'} className={s.subtitle}>
                        Your password must be between 6 and 20 characters
                    </Typography>
                    <Button type={'submit'} fullWidth className={s.btn}>
                        Create new password
                    </Button>
                </form>

            </Card>
        </div>
    );
}

SignUp.getLayout = getLayout
export default SignUp;

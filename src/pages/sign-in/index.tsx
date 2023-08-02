import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import classes from "@/pages/sign-in/SignIn.module.scss"
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {Github} from "public/icon/github-logo";
import {Google} from "public/icon/google-logo";
import {ControlledTextField} from "@/shared/ui/controlled";
import {loginSchema} from "@/shared/utils/schemas/login-schema";
import {useLoginMutation} from "@/api/authApi";


export type LoginFormType = z.infer<typeof loginSchema>


type LoginFormPropsType = {
    linkPath: string
    onSubmitHandler: (data: LoginFormType) => void
}

const SignIn = () => {

    const [signIn] = useLoginMutation()

    const onSubmitHandler = (data: LoginFormType) => console.log(data)
    const {control, handleSubmit} = useForm<LoginFormType>()
    const onSubmit = handleSubmit(data => {
        onSubmitHandler(data)
        signIn({password: data.password, login: data.userName})
    })

    return (
        <div className={classes.container}>

            <div className={classes.signInForm}>
                <div className={classes.header}>
                    <Typography variant="h1" as="h1" className={classes.header__title}>
                        Sign In
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
                    <ControlledTextField control={control} name={'userName'} label={'Username'}/>
                    <ControlledTextField control={control} name={'password'} label={'Password'} type={'password'}/>
                    <Link href={'/forgot-password'} className={classes.form__forgot}>
                        Forgot Password?
                    </Link>
                    <Button type={'submit'} fullWidth>
                        Sign In
                    </Button>
                </form>
                <div className={classes.footer}>
                    <Typography>
                        Don&apos;t have an account?
                    </Typography>
                    <Link href={'/sign-up'}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

SignIn.getLayout = getLayout
export default SignIn;

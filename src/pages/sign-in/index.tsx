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


export type RegisterFormType = z.infer<typeof registerSchema>

//
// export const getStaticProps = async () => {
//     return {
//         props: {
//         }
//     }
// }
//
// type PropsType = {
//     data: void
// }

export type SignInFormData = {
    email: string
    password: string

};

type RegisterFormPropsType = {
    linkPath: string
    onSubmitHandler: (data: RegisterFormType) => void
}

const SignIn = () => {



    const onSubmitHandler = (data: RegisterFormType) => console.log(data)
    const {control, handleSubmit} = useForm<RegisterFormType>()
    const onSubmit = handleSubmit(data => {
        console.log(data)
        onSubmitHandler(data)
        //setShowForgotModal(true)
        //signUp(data)
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
                    <ControlledTextField control={control} name={'email'} label={'Email'} />
                    <ControlledTextField control={control} name={'password'} label={'Password'} type={'password'} />
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

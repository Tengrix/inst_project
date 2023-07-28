import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import classes from "@/pages/sign-in/SignIn.module.css"
import Link from "next/link";
import {useForm} from "react-hook-form";

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

const SignIn = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormData>()

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <div className={classes.container}>

            <div className={classes.signInForm}>
                <h2>
                    Sign In
                </h2>
                <form className={classes.inputForm} onSubmit={onSubmit}>
                    email
                    <input {...register("email")} />
                    password
                    <input {...register("password")}/>

                    <button type="submit">
                        Sign In
                    </button>
                </form>
                Don&apos;t have an account?
                <Link href={'/sign-up'}>
                    Sign up
                </Link>
            </div>
        </div>
    )
}

SignIn.getLayout = getLayout
export default SignIn;

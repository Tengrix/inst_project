import {getLayout} from "components/Layout/BaseLayout/BaseLayout";
import classes from "pages/signUp/SignUp.module.css";
import {yupResolver} from "@hookform/resolvers/yup";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useSignUpMutation} from "api/authApi";
import {signUpSchema} from "utils/yupResolvers/yupResolver";

export type SignUpFormData = {
    userName:string
    email: string
    password: string
    passwordConfirmation:string

};

const SignUp = () => {

    const [signUp] = useSignUpMutation()

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpFormData>({resolver:yupResolver(signUpSchema)})

    const onSubmit = handleSubmit(data => {
        console.log(data)
        signUp(data)
    })

    return (


        <div className={classes.container}>

            <div className={classes.signUpForm}>
                <h2>
                    Sign Up
                </h2>
                <form className={classes.inputForm} onSubmit={onSubmit}>
                    name
                    <input {...register("userName")} />
                    email
                    <input {...register("email")}/>
                    password
                    <input {...register("password")}/>
                    confirm password
                    <input {...register("passwordConfirmation")}/>
                    <button type="submit">
                        Sign Up
                    </button>
                   </form>
                Do you have an account?
                <Link href={'/signIn'}>
                    Sign in
                </Link>
            </div>
        </div>
    );
}

SignUp.getLayout = getLayout
export default SignUp;

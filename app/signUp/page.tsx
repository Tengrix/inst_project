import Link from 'next/link';
import style from './SignUp.module.css';
const SignUp = () => {
    return (
        <div className={style.signUpModal}>
            <h1 className={style.signUpTitle}>Sign Up</h1>
            <div className={style.links}>
                <img src="/assets/google.png" alt="Sign up with google" width={36} height={36} />
                <img src="/assets/gitHub.png" alt="Sign up with gitHub" width={36} height={36} />
            </div>
            <form className={style.signUpForm} action="">
                <div className={style.labelInputBlock}>
                    <label htmlFor="">Username</label>
                    <input
                        style={{ backgroundColor: 'transparent', color: '#8D9094' }}
                        type="text"
                        id="signUp"
                        placeholder="Username"
                    />
                </div>
                <div className={style.labelInputBlock}>
                    <label htmlFor="">Email</label>
                    <input
                        style={{ backgroundColor: 'transparent', color: '#8D9094' }}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className={style.labelInputBlock}>
                    <label htmlFor="">Password</label>
                    <input
                        style={{ backgroundColor: 'transparent', color: '#8D9094' }}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className={style.labelInputBlock}>
                    <label htmlFor="">Password confimation</label>
                    <input
                        style={{ backgroundColor: 'transparent', color: '#8D9094' }}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button className={style.signUpButton}>Sign Up</button>
            </form>
            <h3 className={style.signUpQuestion}>Do you have an account?</h3>
            <Link href={'/signIn'}>
                <h3 style={{ color: '#397DF6' }}>Sign In</h3>
            </Link>
        </div>
    );
};
export default SignUp;

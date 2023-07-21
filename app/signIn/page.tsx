import Link from 'next/link';
import style from './SignIn.module.css';
import { MouseEvent, useState } from 'react';
import { Congratulations } from '@/components/congratulations/Congratulations';

const SignIn = () => {
    const confirm = false;

    if (!confirm) {
        return (
            <div className={style.congratlationsBlock}>
                <h1 className={style.congratulationsText} style={{ marginTop: '30px' }}>
                    Congratulation
                </h1>
                <p className={style.congratulationsDescription} style={{ marginTop: '30px' }}>
                    Your email has been confirmed
                </p>
                <button className={style.congratulationsButton} style={{ marginTop: '80px' }}>
                    Sign In
                </button>
                <img
                    src={'/assets/congratulations.png'}
                    width={432}
                    height={300}
                    style={{ marginTop: '80px' }}
                />
            </div>
        );
    }

    return (
        <div className={style.signInModal}>
            <h1 className={style.signInTitle}>Sign In</h1>
            <div className={style.links}>
                <img src="/assets/google.png" alt="Sign up with google" width={36} height={36} />
                <img src="/assets/gitHub.png" alt="Sign up with gitHub" width={36} height={36} />
            </div>
            <form className={style.signInForm} action="">
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
                <h3 className={style.signInForgotPasswordText} style={{ color: '#8D9094' }}>
                    <Link href={'/'}>{`Forgot password`}</Link> {/* TODO LINK */}
                </h3>
                <button className={style.signInButton}>Sign In</button>
            </form>
            <h3 className={style.signInQuestion}>{`Don't have an account?`}</h3>
            <Link href={'/'}>
                <h3 style={{ color: '#397DF6' }}>Sign Up</h3>
            </Link>
        </div>
    );
};
export default SignIn;

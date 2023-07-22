import Link from 'next/link';
import style from './SignUp.module.css';
import { Text } from '@/components/text/Text';
import { Links } from '@/components/links/Links';
const SignUp = () => {
    return (
        <div className={style.signUpModal}>
            <Text text="Sign Up" size="20" weight="700" />
            <Links />
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
            <Text text="Do you have an account?" />
            <Link href={'/signIn'}>
                <Text text="Sign in" color="#397DF6" />
            </Link>
        </div>
    );
};
export default SignUp;

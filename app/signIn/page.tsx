import Link from 'next/link';
import style from './SignIn.module.css';
import { Text } from '@/components/text/Text';
import { Links } from '@/components/links/Links';

const SignIn = () => {
    const confirm = true;

    if (!confirm) {
        return (
            <div className={style.congratlationsBlock}>
                <Text size="20" text="Congratulation" />
                <Text text="Your email has been confirmed" size="16" weight="400" />
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
            <Text size="20" weight="700" text="Sign In" />
            <Links />
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

                <Link href={'/'}>
                    <Text size="14px" weight="400" color="#8D9094" text={`Forgot password`} />
                </Link>
                <button className={style.signInButton}>Sign In</button>
            </form>

            <Text text={`Don't have an account?`} size="16" weight="400" />
            <Link href={'/'}>
                <h3 style={{ color: '#397DF6' }}>Sign Up</h3>
            </Link>
        </div>
    );
};
export default SignIn;

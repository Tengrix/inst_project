import Link from "next/link";
import classes from "@/components/Header/Header.module.css"

const Header = () => (
    <div className={classes.header}>
        <Link href={'/'}>
            <h2>Home</h2>
        </Link>
        <Link href={'/signIn'}>
            <h2>Sign In</h2>
        </Link>
        <Link href={'/signUp'}>
            <h2>Sign Up</h2>
        </Link>
        <Link href={'/forgotPassword'}>
            <h2>Forgot Password</h2>
        </Link>
        <Link href={'/signUp/emailConfirmed'}>
            <h2>Email confirmation</h2>
        </Link>
        <Link href={'/signUp/emailVerificationLinkExpired'}>
            <h2>Email Verification Link Expired</h2>
        </Link>
    </div>
)

export default Header;

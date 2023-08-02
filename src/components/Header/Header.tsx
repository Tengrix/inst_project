import Link from 'next/link';
import classes from '@/components/Header/Header.module.css';
import { LangSwitcher } from '../langSwitcher/LangSwitcher';

const Header = () => (
  <div className={classes.header}>
    <div className={classes.container}>
      <h2>Inctagram</h2>

      <Link href={'/sign-in'}>
        <h2>Sign In</h2>
      </Link>

      <Link href={'/sign-up'}>
        <h2>Sign Up</h2>
      </Link>

      <Link href={'/forgot-password'}>
        <h2>Forgot Password</h2>
      </Link>

      <Link href={'/forgot-password/link-has-been-sent'}>
        <h2>Forgot Password/Link sent</h2>
      </Link>

      <Link href={'/forgot-password/email-verification-link-expired'}>
        <h2>Forgot Password/Link expired</h2>
      </Link>

      <Link href={'/forgot-password/create-new-password'}>
        <h2>Create new password</h2>
      </Link>

      <Link href={'/sign-up/email-confirmed'}>
        <h2>Email confirmation</h2>
      </Link>

      <Link href={'/sign-up/email-verification-link-expired'}>
        <h2>Email Verification Link Expired</h2>
      </Link>

      <LangSwitcher />
    </div>
  </div>
);

export default Header;

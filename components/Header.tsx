import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header style={{display:"flex",justifyContent:"space-evenly"}}>
            <Link href='/'>Home</Link>
            <Link href='/signIn'>Sign in</Link>
            <Link href='/forgotPassword'>Forgot password</Link>
            <Link href='/signUp'>Sign up</Link>
            <Link href='/about'>About</Link>
        </header>
    );
};

export default Header;
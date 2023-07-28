// import { useRouter } from 'next/router';
// import React from 'react'

// export default function SingIn() {


//     const router = useRouter();

//   const goToSingUp = () => {
//     router.push('/singUp');
//   };


//   return (
//     <div>
//          Sing In 

//     <h1>
//       <center>
//         <br />
//         <button onClick={goToSingUp }> GO Back to singUp </button>
//       </center>
//     </h1>
    
//     </div>

    
//   )
// }




import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useLoginMutation } from '../../api/apiSlice';
import styles from './singIn.module.css';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = { email, password };
    try {
      await login(credentials).unwrap();
      router.push('/');
    } catch (error: any) {
      if ('message' in error) {
        console.error(error.message);
      } else if ('status' in error) {
        console.error(`Error status: ${error.status}`);
        console.error(`Error data: ${JSON.stringify(error.data)}`);
      }
    }
  };

  const goToSignUp = () => {
    router.push('/singUp');
  };

  return (
    <div className="sign-in-container">
      <h1 className="sign-in-header">Sign In</h1>

      <form className="sign-in-form" onSubmit={handleLogin}>
        <input className="sign-in-input" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input className="sign-in-input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button className="sign-in-button" type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      <button className="sign-in-to-sign-up-button" onClick={goToSignUp}>Go back to signUp</button>
    </div>
  );
}

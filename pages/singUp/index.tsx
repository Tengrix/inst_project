import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
  useRegisterMutation, 
} from '../../api/apiSlice';
import styles from './styles.module.css';

const Registration: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  const [register, { data, isLoading, isError, isSuccess }] = useRegisterMutation();

  const goToSignIn = () => {
    router.push('/singIn');
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register({  password, email });

    if (isError) {
      alert("Registration failed, please try again.");
    } else if (isSuccess) {
      alert("Registration successful! Please confirm your registration");
    }
  };

  return (
    <div className={styles["registration-container"]}>

      <h1 className={styles["registration-title"]}>Sign Up</h1>

      <form onSubmit={handleRegisterSubmit} className={styles["registration-form"]}>

        <label className={styles["registration-label"]}>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} className={styles["registration-input"]} />
        </label>

        <label className={styles["registration-label"]}>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} className={styles["registration-input"]} />
        </label>

        <label className={styles["registration-label"]}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className={styles["registration-input"]} />
        </label>

        <button type="submit" className={styles["registration-button"]}>Sign Up</button>
      </form>

      <div className={styles["registration-center"]}>
        <br />
        <button onClick={goToSignIn} className={styles["registration-back-button"]}>Go Back to Sign In</button>
      </div>
      
    </div>
  );
};

export default Registration;

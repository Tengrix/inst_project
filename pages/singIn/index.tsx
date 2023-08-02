import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useLoginMutation } from '../../api/apiSlice';
import styles from './singIn.module.css';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const [login, setLogin] = useState(''); 
  const [password, setPassword] = useState('');
  const [loginMutation, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = { login, password };
    try {
      await loginMutation(credentials).unwrap();
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
    <div className={styles.signInContainer}>
      <h1 className={styles.signInHeader}>{t('signIn')}</h1>

      <form className={styles.signInForm} onSubmit={handleLoginSubmit}>
        <input 
          className={styles.signInInput} 
          type="text" 
          placeholder={t('username')} 
          value={login} 
          onChange={handleLoginChange} 
        />

        <input 
          className={styles.signInInput} 
          type="password" 
          placeholder={t('password')} 
          value={password} 
          onChange={handlePasswordChange} 
        />

        <button className={styles.signInButton} type="submit" disabled={isLoading}>
          {t('login')}
        </button>
      </form>

      <button className={styles.signInToSignUpButton} onClick={goToSignUp}>{t('goBackToSignUp')}</button>
    </div>
  );
}

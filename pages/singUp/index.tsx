import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRegisterMutation } from '../../api/apiSlice';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const Registration: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userExistsError, setUserExistsError] = useState<boolean>(false);

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const goToSignIn = () => {
    router.push('/singIn');
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setUserExistsError(false);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await register({ login, password, passwordConfirmation, email }).unwrap();

      if (isSuccess) {
        alert(t('registrationSuccessful'));
      }
    } catch (error) {
      setUserExistsError(true);
      console.log('Registration failed:', error);
    }
  };

  return (
    <div className={styles['registration-container']}>
      <h1 className={styles['registration-title']}>{t('signUp')}</h1>
      <form onSubmit={handleRegisterSubmit} className={styles['registration-form']}>
        <div className={styles['registration-field']}>
          <label className={styles['registration-label']}>{t('Username')}:</label>
         
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            placeholder={t('Username')}
            className={userExistsError ? styles['registration-input-error'] : styles['registration-input']}
          />

          <div className={styles['registration-error']}>
            {userExistsError && "User with this name already registered"}
          </div>

        </div>


        <div className={styles['registration-field']}>
          <label className={styles['registration-label']}>{t('email')}:</label>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder={t('email')}
                className={styles['registration-input']}
            />
        </div>


        <div className={styles['registration-field']}>
          <label className={styles['registration-label']}>{t('password')}:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={t('password')}
            className={styles['registration-input']}
          />

        </div>


        <div className={styles['registration-field']}>
          <label className={styles['registration-label']}>{t('Password Confirmation')}:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            placeholder={t('Password Confirmation')}
            className={styles['registration-input']}
          />
        </div>


        <button type="submit" className={styles['registration-button']}>
          {t('signUp')}
        </button>

      </form>

      <div className={styles['registration-center']}>
        <br />

        <button onClick={goToSignIn} className={styles['registration-back-button']}>
          {t('Sing in')}
        </button>

      </div>
    </div>
  );
};

export default Registration;

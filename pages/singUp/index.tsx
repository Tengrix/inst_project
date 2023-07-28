// import { useRouter } from 'next/router';
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import styles from './styles.module.css';

// const Registration: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
//   const [email, setEmail] = useState<string>('');

//   const goToSignIn = () => {
//     router.push('/signIn');
//   };

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();

//     // Validate inputs before sending data
//     if (!username || !email || !password || !passwordConfirmation) {
//       alert('All fields are required!');
//       return;
//     }

//     if (password !== passwordConfirmation) {
//       alert('Password and confirmation do not match!');
//       return;
//     }

//     // Typically, here you would send these data to the server
//     console.log(`Registered with Username: ${username}, Email: ${email}, Password: ${password}`);
//   };

//   const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPasswordConfirmation(event.target.value);
//   };

//   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   return (
//     <div className={styles["registration-container"]}>
//       <h1 className={styles["registration-title"]}>Sign Up</h1>

//       <form onSubmit={handleSubmit} className={styles["registration-form"]}>
//         <label className={styles["registration-label"]}>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} className={styles["registration-input"]} />
//         </label>
//         <label className={styles["registration-label"]}>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} className={styles["registration-input"]} />
//         </label>
//         <label className={styles["registration-label"]}>
//           Password:
//           <input type="password" value={password} onChange={handlePasswordChange} className={styles["registration-input"]} />
//         </label>
//         <label className={styles["registration-label"]}>
//           Confirm Password:
//           <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} className={styles["registration-input"]} />
//         </label>
//         <button type="submit" className={styles["registration-button"]}>Sign Up</button>
//       </form>

//       <div className={styles["registration-center"]}>
//         <br />
//         <button onClick={goToSignIn} className={styles["registration-back-button"]}>Go Back to Sign In</button>
//       </div>
//     </div>
//   );
// };

// export default Registration;






// import { useRouter } from 'next/router';
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { 
//   useRegisterMutation, 
//   // useRegisterConfirmationMutation 
// } from '../../api/apiSlice';
// import styles from './styles.module.css';

// const Registration: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
  
//   const [register, registerResult] = useRegisterMutation();
//   // const [confirmRegistration, confirmResult] = useRegisterConfirmationMutation();

//   const goToSignIn = () => {
//     router.push('/singIn');
//   };

//   const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPasswordConfirmation(event.target.value);
//   };

//   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleRegisterSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     // Validate inputs before sending data
//     // if (!username || !email || !password || !passwordConfirmation) {
//     //   alert('All fields are required!');
//     //   return;
//     // }

//     // if (password !== passwordConfirmation) {
//     //   alert('Password and confirmation do not match!');
//     //   return;
//     // }

//     // await register({ username, password, email, confirmPassword: passwordConfirmation });
//     await register({ username, password, email: passwordConfirmation });
//     if (registerResult.isError) {
//       console.error(registerResult.error);
//       alert("Registration failed, please try again.");
//     } else if (registerResult.isSuccess) {
//       alert("Registration successful! Please confirm your registration");
//     }
//   };

//   return (
//     <div className={styles["registration-container"]}>

//       <h1 className={styles["registration-title"]}>Sign Up</h1>

//       <form onSubmit={handleRegisterSubmit} className={styles["registration-form"]}>

//         <label className={styles["registration-label"]}>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} className={styles["registration-input"]} />
//         </label>

//         <label className={styles["registration-label"]}>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} className={styles["registration-input"]} />
//         </label>

//         <label className={styles["registration-label"]}>
//           Password:
//           <input type="password" value={password} onChange={handlePasswordChange} className={styles["registration-input"]} />
//         </label>

//         {/* <label className={styles["registration-label"]}>
//           Confirm Password:
//           <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} className={styles["registration-input"]} />
//         </label> */}

//         <button type="submit" className={styles["registration-button"]}>Sign Up</button>
//       </form>

//       <div className={styles["registration-center"]}>
//         <br />
//         <button onClick={goToSignIn} className={styles["registration-back-button"]}>Go Back to Sign In</button>
//       </div>
      
//     </div>
//   );
// };

// export default Registration;



// import { useRouter } from 'next/router';
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { 
//   useRegisterMutation, 
//   // useRegisterConfirmationMutation 
// } from '../../api/apiSlice';
// import styles from './styles.module.css';

// const Registration: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
  
//   const [register, registerResult] = useRegisterMutation();
//   // const [confirmRegistration, confirmResult] = useRegisterConfirmationMutation();

//   const goToSignIn = () => {
//     router.push('/singIn');
//   };

//   const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleRegisterSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     await register({ username, password, email });
//     if (registerResult.isError) {
//       console.error(registerResult.error);
//       alert("Registration failed, please try again.");
//     } else if (registerResult.isSuccess) {
//       alert("Registration successful! Please confirm your registration");
//     }
//   };

//   return (
//     <div className={styles["registration-container"]}>

//       <h1 className={styles["registration-title"]}>Sign Up</h1>

//       <form onSubmit={handleRegisterSubmit} className={styles["registration-form"]}>

//         <label className={styles["registration-label"]}>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} className={styles["registration-input"]} />
//         </label>

//         <label className={styles["registration-label"]}>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} className={styles["registration-input"]} />
//         </label>

//         <label className={styles["registration-label"]}>
//           Password:
//           <input type="password" value={password} onChange={handlePasswordChange} className={styles["registration-input"]} />
//         </label>

//         <button type="submit" className={styles["registration-button"]}>Sign Up</button>
//       </form>

//       <div className={styles["registration-center"]}>
//         <br />
//         <button onClick={goToSignIn} className={styles["registration-back-button"]}>Go Back to Sign In</button>
//       </div>
      
//     </div>
//   );
// };

// export default Registration;


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

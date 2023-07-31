import { LocaleType } from "./ru";

export const en : LocaleType = {
    auth:{
        signInPage:{
            title:'Sign In',
            forgotPassword:'Forgot Password',
            question:'Don’t have an account?'
        },
        signUpPage:{
            title:'Sign In',
            question:'Do you have an account?',             
        },  
        mergerPage:{
            title:'Merger of Accounts',
            mergerAccountsQuestioneText:{
                mergeAccount(email:string){
                    return `The user with email ${email} is already in the system. Could we merge this accounts?`
                }
            },
            mergeButton:{
                yes:'Yes, merge',
                no:'No'
            },
        }, 
        congratulationPage:{
            title:'Congratulations!',
            congratulationText:'Your email has been confirmed',
        },   
        forgotPasswordPage:{
            title:'Forgot Password',
            enterYourEmailText:`Enter your email address and we will send you further instructions `,
            linkHasBeenSentText:`The link has been sent by email. If you don’t receive an email send link again`,
        },
        verificationPage:{
            linkInvalidTitle:'Email verification link invalid',
            linkExpiredTitle:'Email verification link expired',
            verificationText:'Looks like the verification link has expired. Not to worry, we can send the link again'
        },
        modal:{
            modalTitle:'Email sent',
            modalText:{
                sentEmailTo(email:string){
                    return `We have sent a link to confirm your email to ${email}`
                }
            }
        },
        createNewPassword:{
            title:'Create New Password'
        },
    form:{
        username:'Username',
        email:'Email',
        password:'Password',
        passwordConfirmation:'Password confirmation',
        passwordRule:'Your password must be between 6 and 20 characters',
        newPassword:'New password',
        button:{
            signUpButton:'Sign Up',
            signInButton:'Sign In',
            backToSignIn:'Back to Sign In',
            sendLink:'Send Link',
            sendLinkAgain:'Send Link Again',
            resendLink:'Resend link',
            resendVerificationLink:'Resend verification link',
            createNewPassword:'Create new password'
        },
        error:{
            uNameRegisteredError:'User with this username is already registered',
            emaileIsRequiredError:'Email is required',
            passwordIsRequiredError:'Password is required',
            incorrectUsernameOrPasswordError: 'Incorrect username or password',
            incorrectValue:`The password or email you entered is incorrect. Please try again`
        },
    }
    }, 
}
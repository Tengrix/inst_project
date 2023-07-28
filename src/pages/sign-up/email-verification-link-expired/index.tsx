import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import {useResendEmailConfirmationMutation} from "api/authApi";
import {useState} from "react";


const EmailVerificationLinkExpired = () => {
    const [resendEmailConfirmation] = useResendEmailConfirmationMutation()
    const [email,setEmail] = useState('')

    const resendHandler = () => {
        resendEmailConfirmation({email: email})
    }

    return (
        <div>
            <h2>Email verification link expired</h2>
            <div> Looks like the verification link has expired. Not to worry, we can send the link again</div>
            <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text"/>
            <button onClick={resendHandler}>
                Resend verification link
            </button>
        </div>
    );
}

EmailVerificationLinkExpired.getLayout = getLayout
export default EmailVerificationLinkExpired;

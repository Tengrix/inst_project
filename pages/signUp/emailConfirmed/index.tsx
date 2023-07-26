import {getLayout} from "components/Layout/BaseLayout/BaseLayout";
import {useResendEmailConfirmationMutation} from "api/authApi";


const EmailVerificationLinkExpired = () => {
    const [resendEmailConfirmation] = useResendEmailConfirmationMutation()

    const resendHandler = () => {
        resendEmailConfirmation({email: 'email'})
    }

    return (
        <div>
            <h2>Email verification link expired</h2>
            <div> Looks like the verification link has expired. Not to worry, we can send the link again</div>
            <button onClick={resendHandler}>
                Resend verification link
            </button>
        </div>
    );
}

EmailVerificationLinkExpired.getLayout = getLayout
export default EmailVerificationLinkExpired;

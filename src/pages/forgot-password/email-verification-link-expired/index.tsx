import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import React from "react";
import {usePasswordRecoveryMutation} from "@/api/authApi";
import s from './index.module.scss'
import {Button} from "@/shared/ui/button";
import img from 'public/assets/expiredLink.png'
import {Modal} from "@/shared/ui/modal/Modal";
import Image from "next/image";

const EmailVerificationLinkExpired = () => {
    const [forgotPassword] = usePasswordRecoveryMutation();

    const resendHandler = () => {
        forgotPassword({email: ''})
    }

    return (
        <div className={s.container}>
            <h2>Email verification link expired</h2>
            <div className={s.body}> Looks like the verification link has expired. Not to worry, we can send the link
                again
            </div>
            <div>
                <Modal
                    modalTrigger={<Button variant='primary' onClick={resendHandler}>
                        Resend verification link
                    </Button>}
                    title={"Email sent"}
                >
                    We have sent a link to confirm your email to EMAIL
                </Modal>
            </div>
            <Image src={img.src} alt="" width={473} height={352}/>
        </div>
    );
}

EmailVerificationLinkExpired.getLayout = getLayout
export default EmailVerificationLinkExpired;

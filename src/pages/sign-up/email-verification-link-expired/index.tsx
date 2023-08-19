import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import React from "react";
import {useResendEmailConfirmationMutation} from "@/api/authApi";
import s from './index.module.scss'
import {Button} from "@/shared/ui/button";
import img from 'public/assets/expiredLink.png'
import Image from "next/image";
import {useRouter} from "next/router";

const EmailVerificationLinkExpired = () => {
    const [resendEmailConfirmation] = useResendEmailConfirmationMutation()
    const router = useRouter()
    const {email} = router.query

    const resendHandler = () => {
        resendEmailConfirmation({email: email as string})
    }

    return (
        <div className={s.container}>
            <h2>Email verification link expired</h2>
            <div className={s.body}> Looks like the verification link has expired. Not to worry, we can send the link
                again {email}
            </div>
            <div>
                <Button variant='primary' onClick={resendHandler}>
                    Resend verification link
                </Button>
            </div>
            <Image src={img.src} alt="" width={473} height={352}/>
        </div>
    );
}

EmailVerificationLinkExpired.getLayout = getLayout
export default EmailVerificationLinkExpired;

import {useRouter} from "next/router";
import jwtDecode from "jwt-decode";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useSignUpConfirmationMutation} from "@/redux/store/Auth/authApiSlice";

type TokenType = {
    email: string
    iat: number,
    eat: number
}
const EmailLinkValidationWrapper = () => {
    const router = useRouter()
    const params = useSearchParams()

    const code = params.get('code') as string
    const email = params.get('email')

    const [confirmEmail] = useSignUpConfirmationMutation()


    useEffect(()=>{
        email&&confirmEmail({code})
            .unwrap()
            .then(() => {
                router.push('/sign-up/email-confirmed')
            })
            .catch((e)=>{
                console.log(e)
            })
    },[code,email])

    return (
        <div>
            {/*This is wrapper for token validation*/}
            {/*<div>token: {token}</div>*/}
            {/*<div> email: {decode.email}</div>*/}
            {/*<div>issued at: {decode.iat}</div>*/}
            {/*<div>expired at: {decode.eat}</div>*/}
            {/*<div>current time : {currentUnixTime}</div>*/}
            {/*<div>token validation : {validation.toString()}</div>*/}
        </div>
    );
};

EmailLinkValidationWrapper.getLayout = getLayout
export default EmailLinkValidationWrapper;

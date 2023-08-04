import {useRouter} from "next/router";
import jwtDecode from "jwt-decode";
import {useSignUpConfirmationMutation} from "@/api/authApi";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";

type TokenType = {
    email: string
    iat: number,
    eat: number
}
const EmailLinkValidationWrapper = () => {
    const router = useRouter()
    const [confirmEmail] = useSignUpConfirmationMutation()

    const unparsedToken = router.query.token as string
    if (!unparsedToken) {
        return (<div>Loading in process</div>)
    }

    const token = unparsedToken.split('_').join('.')
    const decode: TokenType = jwtDecode(token)
    const currentUnixTime = Date.now()
    const validation = false
    // const validation = currentUnixTime > decode.eat

    if (validation) {
        confirmEmail({code: 'code from token'})
        router.push('/sign-up/email-confirmed')
    } else {
        router.push({pathname: '/sign-up/email-verification-link-expired', query: {email: decode.email}})
    }


    return (
        <div>
            This is wrapper for token validation
            <div>token: {token}</div>
            <div> email: {decode.email}</div>
            <div>issued at: {decode.iat}</div>
            <div>expired at: {decode.eat}</div>
            <div>current time : {currentUnixTime}</div>
            <div>token validation : {validation.toString()}</div>
        </div>
    );
};

EmailLinkValidationWrapper.getLayout = getLayout
export default EmailLinkValidationWrapper;
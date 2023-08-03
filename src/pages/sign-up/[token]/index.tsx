import {useRouter} from "next/router";
import jwtDecode from "jwt-decode";

type TokenType = {
    email: string
    iat: number,
    eat: number
}
const TokenValidationWrapper = () => {
    const router = useRouter()
    //Set this token here http://localhost:3000/sign-up/testToken
    // const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9_eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJsdWNreTEwMjkxOTk0QGdtYWlsLmNvbSIsImlhdCI6MTY5MTA1MzY2MywiZWF0IjoxNjkxMDU3MjYzfQ_DTjRErovOQLRlDqKfiEWiwl60Q8OfF81biHmoUglc9I'

    const unparsedToken = router.query.token as string
    if (!unparsedToken) {
        return (<div>Loading in process</div>)
    }

    const token = unparsedToken.split('_').join('.')
    const decode: TokenType = jwtDecode(token)
    const currentUnixTime = Date.now()
    const validation = currentUnixTime>decode.eat

    if (validation) {
        router.push('/sign-up/email-confirmed')
    } else {
        router.push('/sign-up/email-verification-link-expired')
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

export default TokenValidationWrapper;
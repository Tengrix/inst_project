import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";


const EmailConfirmed = () => (
    <div>
        <h2>Congratulations</h2>
        <div> Your email has been confirmed</div>
        <Link href={'/sign-in'}>
            <button> Sign In</button>
        </Link>
    </div>
)

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed;

import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";
import s from './index.module.scss'
import {Button} from "@/shared/ui/button";
import img from '../../../../public/sign_up/emailConfirmation.png'

const EmailConfirmed = () => (
    <div className={s.container}>
        <h2>Congratulations</h2>
        <div> Your email has been confirmed</div>
        <Link href={'/sign-in'}>
            <Button variant={"primary"}>
                Sign in
            </Button>
        </Link>
        <img src={img.src} alt=''/>
    </div>
)

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed;

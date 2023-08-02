import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";
import s from './index.module.scss'
import {Button} from "@/shared/ui/button";
import img from 'public/assets/congratulations.png'
import Image from "next/image";

const EmailConfirmed = () => (
    <div className={s.container}>
        <h2>Congratulations</h2>
        <div> Your email has been confirmed</div>
        <Link href={'/sign-in'}>
            <Button variant={"primary"}>
                Sign in
            </Button>
        </Link>
        <Image src={img.src} alt='' width={432} height={300}/>
    </div>
)

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed;

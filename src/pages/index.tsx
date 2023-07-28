import Image from 'next/image'
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import s from '@/styles/Home.module.css'

const Home: NextPageWithLayout = () => (
    <div className={s.center}>
    <Image
        className={s.logo}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
    />
    </div>
)
Home.getLayout = getLayout
export default Home;

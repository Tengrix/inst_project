import Image from 'next/image'
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";

const Home: NextPageWithLayout = () => (
    <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
    />
)
Home.getLayout = getLayout
export default Home;

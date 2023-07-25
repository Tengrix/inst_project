import Image from 'next/image'
import {NextPageWithLayout} from "pages/_app";
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";


const Home:NextPageWithLayout = () => (
    <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
    />
)
Home.getLayout = getLayout
export default Home;

import Image from 'next/image';
import {NextPageWithLayout} from '@/pages/_app';
import {getLayout} from 'src/components/Layout/BaseLayout/BaseLayout';
import {GetStaticPropsContext} from 'next';
import {useRouter} from "next/router";

// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   return {
//     props: {
//       messages: (await import(`../../messages/${locale}.json`)).default,
//     },
//   };
// }

const Home: NextPageWithLayout = () => {

    return (
        <>
        </>
    )
};
Home.getLayout = getLayout;
export default Home;

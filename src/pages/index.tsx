import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   return {
//     props: {
//       messages: (await import(`../../messages/${locale}.json`)).default,
//     },
//   };
// }

const Home: NextPageWithLayout = () => {
    return <></>;
};
Home.getLayout = getLayout;
export default Home;

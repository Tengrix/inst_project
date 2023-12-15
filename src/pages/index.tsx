import { getUserLayout } from '@/components/Layout/UserLayout/UserLayout';
import { NextPageWithLayout } from '@/pages/_app';

const Home: NextPageWithLayout = () => {
    return <></>;
};
Home.getLayout = getUserLayout;
export default Home;

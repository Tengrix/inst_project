import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import { NextPageWithLayout } from '@/pages/_app';

const Home: NextPageWithLayout = () => {
    return <></>;
};
Home.getLayout = getLayoutWithSidebar;
export default Home;

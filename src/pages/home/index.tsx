import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';
import Sidebar from '@/components/Sidebar/Sidebar';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    // const messages = (await import(`messages/${locale}/myProfile.json`)).default;
    const sidebarMessages = (await import(`messages/${locale}/sidebar.json`)).default;

    // const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            // messages: messages,
            // title: t('myProfile.pageTitle'),
            sidebarMessages: sidebarMessages
        }
    };
}

const Home = ({ sidebarMessages }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Sidebar messages={sidebarMessages} />

        </div>
    );
};

Home.getLayout = getLayout;
export default Home;
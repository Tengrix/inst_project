import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';

import { useGetAllPostsQuery } from '@/api/authApi';
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import Post from '@/components/Post/Post';
import Sidebar from '@/components/Sidebar/Sidebar';

import s from './styles.module.scss';

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
    const { data } = useGetAllPostsQuery(2);
    const posts = data && [...data].reverse();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar messages={sidebarMessages} />
            <div className={s.feed}>{posts?.map(post => <Post key={post.id} post={post} />)}</div>
        </div>
    );
};

Home.getLayout = getLayout;
export default Home;

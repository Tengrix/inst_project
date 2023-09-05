import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';

import { useGetAllPostsQuery } from '@/api/authApi';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import Post from '@/components/Post/Post';

import s from './styles.module.scss';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('myProfile.pageTitle')
        }
    };
}

const Home = () => {
    const { data } = useGetAllPostsQuery(2);
    const posts = data && [...data].reverse();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className={s.feed}>{posts?.map(post => <Post key={post.id} post={post} />)}</div>
        </div>
    );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;

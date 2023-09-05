import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';
import { useEffect, useState } from 'react';

import { useLazyGetAllPostsQuery } from '@/api/authApi';
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
    const [page, setPage] = useState(1);
    const [getPosts, { data, isLoading }] = useLazyGetAllPostsQuery();
    useEffect(() => {
        getPosts(page);
    }, [page]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className={s.feed}>
                {data?.map((post, i, arr) => (
                    <Post
                        key={post.id}
                        post={post}
                        isLast={arr.length - 1 === i}
                        setNewPage={() => setPage(prev => prev + 1)}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;

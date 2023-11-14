import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next/types';
import { createTranslator, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetUserDataQuery, useGetAllPostsQuery, useLazyGetPostByIdQuery } from '@/api/api';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import EditPost from '@/components/Post/EditPost/EditPost';
import { PostType } from '@/components/Post/types';
import { Button } from '@/shared/ui/button';
import Spinner from '@/shared/ui/spinner/Spinner';
import { Typography } from '@/shared/ui/typography';

import s from './styles.module.scss';

import noAvatar from '/public/assets/noAvatar.png';

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

const UsersList = () => {
    const translationPath = 'myProfile';
    const t = useTranslations(translationPath);
    const { data: userData } = useGetUserDataQuery();
    const [editPostMode, setEditPostMode] = useState<boolean>(false);
    const [getPostById, { data: post, isLoading: postIsLoading, isSuccess }] = useLazyGetPostByIdQuery();

    const [page, setPage] = useState(1);
    const { data: postsData, isLoading } = useGetAllPostsQuery(page, { refetchOnMountOrArgChange: true });
    const fetchNextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    if (!userData) {
        return <Spinner />;
    }

    return <div className={s.container}></div>;
};

UsersList.getLayout = getLayoutWithSidebar;

export default UsersList;

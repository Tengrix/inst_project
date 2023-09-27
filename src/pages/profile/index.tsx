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

const Profile = () => {
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

    const editPostModeHandler = () => {
        setEditPostMode(!editPostMode);
    };
    const getPost = (id: string) => getPostById(id);

    const photoGallery =
        postsData &&
        postsData.items.map(post => {
            return (
                <>
                    {post.image.map((image, i) => {
                        return (
                            <Image
                                onClick={() => {
                                    editPostModeHandler();
                                    getPost(post.id);
                                }}
                                key={post.id + i}
                                src={image}
                                alt={post.id}
                                width={500}
                                height={500}
                            />
                        );
                    })}
                </>
            );
        });

    if (!userData) {
        return <Spinner />;
    }
    const following: number = 512356123;
    const followers: number = 8656456132;
    const publications: number = 7821238;
    return (
        <div className={s.container}>
            <div className={s.profileHeader}>
                <Image
                    src={userData.photo ? `${userData.photo}?v=${Date.now()}` : noAvatar}
                    alt="userAva"
                    width={250}
                    height={250}
                />
                <div className={s.profileInfo}>
                    <div className={s.username}>
                        <Typography variant={'h1'}>{`${userData.firstName} ${userData.lastName}`}</Typography>
                        <Link href={'/profile-settings'}>
                            <Button variant={'secondary'}>{t('profileSettings')}</Button>
                        </Link>
                    </div>
                    <div className={s.profileStats}>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{following.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>{t('following')}</Typography>
                        </div>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{followers.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>{t('followers')}</Typography>
                        </div>
                        <div className={s.stats}>
                            <Typography variant={'bold14'}>{publications.toLocaleString('ru-RU')}</Typography>
                            <Typography variant={'regular14'}>{t('publications')}</Typography>
                        </div>
                    </div>
                    <div className={s.aboutMe}>{userData.aboutMe}</div>
                </div>
            </div>
            <InfiniteScroll
                next={fetchNextPage}
                hasMore={true}
                loader={isLoading}
                dataLength={postsData?.items.length ?? 0}
                scrollThreshold={0.9}>
                <div className={s.photoGallery}>{photoGallery}</div>
            </InfiniteScroll>
            {editPostMode ? (
                <EditPost
                    key={post?.id}
                    edit={editPostMode}
                    editPostModeHandler={editPostModeHandler}
                    post={post as PostType}
                    user={userData}
                    isSuccess={isSuccess}
                    isLoading={postIsLoading}
                />
            ) : null}
        </div>
    );
};

Profile.getLayout = getLayoutWithSidebar;

export default Profile;

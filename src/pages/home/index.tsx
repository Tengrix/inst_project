import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';
import React, { LegacyRef, useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

import { useGetAllPostsQuery } from '@/api/api';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import Post from '@/components/Post/Post';
import { PostType } from '@/components/Post/types';

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

const cache = new CellMeasurerCache({
    fixedHeight: true,
    minHeight: 1000
});
const Home = () => {
    const [page, setPage] = useState(1);
    const { data: postsData, isLoading } = useGetAllPostsQuery(page, { refetchOnMountOrArgChange: true });

    const countPhotos = postsData?.items.reduce((acc, cur) => {
        return acc + cur.image.length;
    }, 0);

    const fetchNextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    return (
        <div className={s.container}>
            <div className={s.feed}>
                {postsData !== undefined && postsData?.items.length > 0 && (
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowHeight={cache.rowHeight}
                                deferredMeasurementCache={cache}
                                rowCount={postsData?.items.length ?? 0}
                                overscanRowCount={3}
                                rowRenderer={({ key, index, style, parent }) => {
                                    const post = postsData?.items[index];
                                    return (
                                        <CellMeasurer
                                            key={key}
                                            cache={cache}
                                            parent={parent}
                                            columnIndex={0}
                                            rowIndex={index}>
                                            {({ registerChild }) => (
                                                <div
                                                    className={s.virtualList}
                                                    style={style}
                                                    ref={registerChild as LegacyRef<HTMLDivElement>}>
                                                    <InfiniteScroll
                                                        next={fetchNextPage}
                                                        hasMore={true}
                                                        loader={isLoading}
                                                        dataLength={countPhotos ?? 0}
                                                        scrollThreshold={0.9}>
                                                        <Post key={post?.id} post={post as PostType} />
                                                    </InfiniteScroll>
                                                </div>
                                            )}
                                        </CellMeasurer>
                                    );
                                }}
                            />
                        )}
                    </AutoSizer>
                )}
                {/*<div className={s.feed}>{postsData?.items.map(post => <Post key={post.id} post={post} />)}</div>*/}
            </div>
        </div>
    );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;

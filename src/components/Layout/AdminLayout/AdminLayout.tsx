import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ReactElement } from 'react';

import { AdminRouting } from '@/components/AdminRouting/AdminRouting';
import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';

import s from './AdminLayout.module.scss';

const baseGraphQLURL = new HttpLink({
    uri: process.env.NEXT_PUBLIC_INCTAGRAM_GRAPHQL_URL,
    credentials: 'include'
});

const client = new ApolloClient({
    link: baseGraphQLURL,
    cache: new InMemoryCache()
});

export const getLayoutAdmin = (page: ReactElement) => {
    return (
        <ApolloProvider client={client}>
            <BaseLayout>
                <AdminRouting />
                <div className={s.page}>{page}</div>
            </BaseLayout>
        </ApolloProvider>
    );
};

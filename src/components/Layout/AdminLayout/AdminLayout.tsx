import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactElement } from 'react';

import { AdminRouting } from '@/components/AdminRouting/AdminRouting';
import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';

const baseGraphQLURL = process.env.NEXT_PUBLIC_INCTAGRAM_GRAPHQL_URL;

const client = new ApolloClient({
    uri: baseGraphQLURL,
    cache: new InMemoryCache()
});

export const getLayoutAdmin = (page: ReactElement) => {
    return (
        <ApolloProvider client={client}>
            <BaseLayout>
                <AdminRouting />
                {page}
            </BaseLayout>
        </ApolloProvider>
    );
};

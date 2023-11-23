import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';

import * as Types from 'src/api/queries/types';

const defaultOptions = {} as const;
export type GetAllUsersQueryVariables = Types.Exact<{
    page?: Types.Scalars['Int']['input'];
    itemsPerPage?: Types.Scalars['Int']['input'];
    search?: Types.Scalars['String']['input'];
    sortByCreateDate?: Types.InputMaybe<Types.Scalars['String']['input']>;
    sortByUserName?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetAllUsersQuery = {
    __typename?: 'Query';
    getAllUsers: {
        __typename?: 'Users';
        total: number;
        data?: Array<{
            __typename?: 'User2';
            id: string;
            login?: string | null;
            email: string;
            createdAt: string;
        }> | null;
    };
};

export const GetAllUsersDocument = gql`
    query getAllUsers(
        $page: Int! = 1
        $itemsPerPage: Int! = 32
        $search: String! = ""
        $sortByCreateDate: String
        $sortByUserName: String
    ) {
        getAllUsers(
            page: $page
            itemsPerPage: $itemsPerPage
            search: $search
            sortByCreateDate: $sortByCreateDate
            sortByUserName: $sortByUserName
        ) {
            data {
                id
                login
                email
                createdAt
            }
            total
        }
    }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      itemsPerPage: // value for 'itemsPerPage'
 *      search: // value for 'search'
 *      sortByCreateDate: // value for 'sortByCreateDate'
 *      sortByUserName: // value for 'sortByUserName'
 *   },
 * });
 */
export function useGetAllUsersQuery(
    baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
}

export function useGetAllUsersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
}

export function useGetAllUsersSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
}

export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;

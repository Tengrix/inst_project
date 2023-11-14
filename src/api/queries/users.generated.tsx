import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';

import * as Types from 'src/api/queries/types';

const defaultOptions = {} as const;
export type GetAllUsersQueryVariables = Types.Exact<{
    userId?: Types.Scalars['String']['input'];
    page?: Types.Scalars['Float']['input'];
    itemsPerPage?: Types.Scalars['Float']['input'];
    search?: Types.Scalars['String']['input'];
}>;

export type GetAllUsersQuery = {
    __typename?: 'Query';
    getAllUsers: Array<{ __typename?: 'User2'; id: string; login?: string | null; role: string; email: string }>;
};

export const GetAllUsersDocument = gql`
    query getAllUsers(
        $userId: String! = "ae393edd-a455-4015-baf6-a11dc389172b"
        $page: Float! = 1
        $itemsPerPage: Float! = 32
        $search: String! = ""
    ) {
        getAllUsers(userId: $userId, page: $page, itemsPerPage: $itemsPerPage, search: $search) {
            id
            login
            role
            email
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
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *      itemsPerPage: // value for 'itemsPerPage'
 *      search: // value for 'search'
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

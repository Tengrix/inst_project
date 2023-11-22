import { gql } from '@apollo/client';

export const USERS = gql`
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

import { gql } from '@apollo/client';

export const USERS = gql`
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

import { gql, useQuery } from '@apollo/client';

import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Table from '@/components/Table/Table';
import Spinner from '@/shared/ui/spinner/Spinner';

const header = {
    id: 'User ID',
    login: 'Username',
    role: 'Role',
    email: 'Email'
};

const USERS = gql`
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

const UsersList = () => {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    return <Table data={data.getAllUsers} header={header} />;
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

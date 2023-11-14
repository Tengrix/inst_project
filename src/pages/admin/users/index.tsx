import { useQuery } from '@apollo/client';

import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Table from '@/components/Table/Table';
import { USERS } from '@/pages/admin/queries/users';
import Spinner from '@/shared/ui/spinner/Spinner';

const header = {
    id: 'User ID',
    login: 'Username',
    role: 'Role',
    email: 'Email'
};

const UsersList = () => {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    return <Table data={data.getAllUsers} header={header} />;
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

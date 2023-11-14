import { useGetAllUsersQuery } from '@/api/queries/users.generated';
import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Table from '@/components/Table/Table';
import Spinner from '@/shared/ui/spinner/Spinner';

const header = {
    id: 'User ID',
    login: 'Username',
    role: 'Role',
    email: 'Email'
};

const UsersList = () => {
    const { loading, error, data } = useGetAllUsersQuery({
        variables: {
            userId: 'ae393edd-a455-4015-baf6-a11dc389172b',
            page: 1,
            itemsPerPage: 32,
            search: ''
        }
    });
    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    return <Table data={data!.getAllUsers} header={header} />;
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

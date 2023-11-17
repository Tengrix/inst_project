import { format } from 'date-fns';
import { useState } from 'react';

import { useGetAllUsersQuery } from '@/api/queries/users.generated';
import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Table, { TableHeader } from '@/components/Table/Table';
import Spinner from '@/shared/ui/spinner/Spinner';

const UsersList = () => {
    const [searchParams, setSearchParams] = useState({ email: 'asc', createdAt: 'asc' });
    const { loading, error, data } = useGetAllUsersQuery({
        variables: {
            page: 1,
            itemsPerPage: 32,
            search: '',
            sortByCreateDate: searchParams.createdAt,
            sortByUserName: searchParams.email
        }
    });
    const usersWithFormattedDate =
        data &&
        data.getAllUsers.data!.map(user => ({
            ...user,
            createdAt: format(new Date(+user.createdAt), 'dd.MM.yyyy')
        }));

    const header: { [key: string]: TableHeader } = {
        id: { label: 'User ID' },
        login: { label: 'Username' },
        email: {
            label: 'Email',
            sortable: true,
            onSort: sort => setSearchParams(prev => ({ ...prev, email: sort }))
        },
        createdAt: {
            label: 'Registration date',
            sortable: true,
            onSort: sort => setSearchParams(prev => ({ ...prev, createdAt: sort }))
        }
    };
    if (loading) return <Spinner />;
    if (error) return `Error! ${error.message}`;

    return <Table data={usersWithFormattedDate!} headers={header} />;
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

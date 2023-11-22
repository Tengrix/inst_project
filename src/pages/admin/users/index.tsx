import { format } from 'date-fns';
import { useState } from 'react';

import { useGetAllUsersQuery } from '@/api/queries/users.generated';
import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Search from '@/components/Search/Search';
import Table, { TableHeader } from '@/components/Table/Table';
import { Pagination } from '@/shared/ui/pagination';
import Select from '@/shared/ui/select/Select';

import s from './Users.module.scss';

const UsersList = () => {
    const [sortParams, setSortParams] = useState<{ sortByUserName?: string; sortByCreateDate?: string }>({});
    const [pageParams, setPageParams] = useState<{ page: number; itemsPerPage: number }>({ page: 1, itemsPerPage: 12 });
    const [searchByEmail, setSearchByEmail] = useState('');
    const { loading, error, data } = useGetAllUsersQuery({
        variables: {
            ...pageParams,
            search: searchByEmail,
            ...sortParams
        }
    });
    const totalPages = data?.getAllUsers && Math.floor(data.getAllUsers.total! / pageParams.itemsPerPage);
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
            onSort: sort => setSortParams({ sortByUserName: sort })
        },
        createdAt: {
            label: 'Registration date',
            sortable: true,
            onSort: sort => setSortParams({ sortByCreateDate: sort })
        }
    };
    if (error) return `Error! ${error.message}`;

    return (
        <div className={s.container}>
            <div className={s.searchBar}>
                <Search setSearch={setSearchByEmail} />
                <Select
                    items={[
                        { label: 'Blocked', value: 'Blocked' },
                        { label: 'Not blocked', value: 'Not blocked' },
                        { label: 'Not selected', value: 'Not selected' }
                    ]}
                    onValueChange={() => {}}
                    defaultValue={{ label: 'Not selected', value: 'Not selected' }}
                />
            </div>
            <Table data={usersWithFormattedDate!} headers={header} />
            <Pagination
                page={pageParams.page}
                totalCount={totalPages}
                perPage={pageParams.itemsPerPage}
                perPageOptions={[6, 12, 18]}
                onPerPageChange={itemsPerPage => setPageParams(prev => ({ ...prev, itemsPerPage: itemsPerPage }))}
                onChange={page => setPageParams(prev => ({ ...prev, page }))}
            />
        </div>
    );
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

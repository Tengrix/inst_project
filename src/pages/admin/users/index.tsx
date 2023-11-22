import { useState } from 'react';

import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Search from '@/components/Search/Search';
import { TableHeader } from '@/components/Table/Table';
import Select from '@/shared/ui/select/Select';

import s from './Users.module.scss';

const UsersList = () => {
    const [sort, setSort] = useState<{ sortByUserName?: string; sortByCreateDate?: string }>({});
    const [searchByEmail, setSearchByEmail] = useState('');
    // const { loading, error, data } = useGetAllUsersQuery({
    //     variables: {
    //         page: 1,
    //         itemsPerPage: 32,
    //         search: searchByEmail,
    //         ...sort
    //     }
    // });
    // const usersWithFormattedDate =
    //     data &&
    //     data.getAllUsers.data!.map(user => ({
    //         ...user,
    //         createdAt: format(new Date(+user.createdAt), 'dd.MM.yyyy')
    //     }));

    const header: { [key: string]: TableHeader } = {
        id: { label: 'User ID' },
        login: { label: 'Username' },
        email: {
            label: 'Email',
            sortable: true,
            onSort: sort => setSort({ sortByUserName: sort })
        },
        createdAt: {
            label: 'Registration date',
            sortable: true,
            onSort: sort => setSort({ sortByCreateDate: sort })
        }
    };
    // if (loading) return <Spinner />;
    // if (error) return `Error! ${error.message}`;

    return (
        <div className={s.container}>
            <Search setSearch={setSearchByEmail} />
            <Select
                items={[{ label: 'Blocked' }, { label: 'Not blocked' }]}
                onValueChange={() => {}}
                defaultValue={{ label: 'Not selected' }}
            />
            {/*<Table data={usersWithFormattedDate!} headers={header} />*/}
        </div>
    );
};

UsersList.getLayout = getLayoutAdmin;

export default UsersList;

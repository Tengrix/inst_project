import { format } from 'date-fns';
import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';
import { useState } from 'react';

import { useGetAllUsersQuery } from '@/api/queries/users.generated';
import { getLayoutAdmin } from '@/components/Layout/AdminLayout/AdminLayout';
import Search from '@/components/Search/Search';
import Table, { TableHeader } from '@/components/Table/Table';
import { Pagination } from '@/shared/ui/pagination';
import Select from '@/shared/ui/select/Select';

import s from './Users.module.scss';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages
            // title: t('myProfile.pageTitle')
        }
    };
}

const UsersList = () => {
    const [sortParams, setSortParams] = useState<{ sortByUserName?: string; sortByCreateDate?: string }>({});
    const [pageParams, setPageParams] = useState<{ page: number; itemsPerPage: number }>({ page: 1, itemsPerPage: 12 });
    const [searchByEmail, setSearchByEmail] = useState('');
    const {
        loading,
        error,
        data: users
    } = useGetAllUsersQuery({
        variables: {
            ...pageParams,
            search: searchByEmail,
            ...sortParams
        }
    });
    const totalPages = users?.getAllUsers && Math.floor(users.getAllUsers.total! / pageParams.itemsPerPage);
    const usersWithFormattedDate =
        users &&
        users.getAllUsers.data!.map(user => ({
            ...user,
            createdAt: format(new Date(+user.createdAt), 'dd.MM.yyyy')
        }));

    const headers: { [key: string]: TableHeader } = {
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
        },
        actions: { label: 'Actions' }
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
            <Table data={usersWithFormattedDate!} headers={headers} />
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

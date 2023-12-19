import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { AdminActions } from '@/components/Table/AdminActions/AdminActions';
import Spinner from '@/shared/ui/spinner/Spinner';

import s from './Table.module.scss';

export type TableHeader = {
    label: string;
    sortable?: boolean;
    onSort?: (sort: 'asc' | 'desc') => void;
};

type SortState = {
    [key: string]: 'asc' | 'desc' | null;
};

type TableProps = {
    data: Array<UserData>;
    headers: { [key: string]: TableHeader };
};
export type UserData = {
    __typename?: 'User2';
    id: string;
    login?: string | null;
    email: string;
    createdAt: string;
};
const Table = ({ data, headers }: TableProps) => {
    const [sortState, setSortState] = useState<SortState>({});
    const t = useTranslations();
    const handleSort = (headerItem: TableHeader, key: string) => {
        if (headerItem.sortable) {
            const newDirection = sortState[key] === undefined ? 'asc' : sortState[key] === 'asc' ? 'desc' : 'asc';
            headers[key].onSort!(newDirection);
            setSortState({ [key]: newDirection });
        }
    };
    const getRow = (key: string, value: string) => (
        <td className={`${s.table__cell} ${s.cell}`}>
            <div className={s.cell__th}>{t(headers[key].label)}</div>
            <div className={s.cell__td}>{value}</div>
        </td>
    );

    const tableHeaders = Object.entries(headers).map(([key, headerItem]) => (
        <th key={key} className={s.table__th}>
            {t(headerItem.label)}
            {headerItem.sortable && (
                <span onClick={() => handleSort(headerItem, key)}>
                    {!sortState[key] ? '↓↑' : sortState[key] === 'desc' ? '↑' : '↓'}
                </span>
            )}
        </th>
    ));

    const tableBody = data?.map((row, i) => (
        <tr key={i} className={s.table__tr}>
            {Object.entries(row).map(([key, value]) => !key.startsWith('_') && getRow(key, value as string))}
            <td className={`${s.table__cell} ${s.cell}`}>
                <div className={s.cell__th}>Actions</div>
                <div className={s.cell__td}>
                    <AdminActions userId={row.id} />
                </div>
            </td>
        </tr>
    ));

    return (
        <table className={s.table}>
            <thead className={s.table__head}>{tableHeaders}</thead>
            <tbody className={s.table__body}>{tableBody ? tableBody : <Spinner />}</tbody>
        </table>
    );
};

export default Table;

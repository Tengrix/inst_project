import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

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
    data: Array<object>;
    headers: { [key: string]: TableHeader };
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
            {Object.entries(row).map(([key, value]) => !key.startsWith('_') && getRow(key, value))}
        </tr>
    ));

    return (
        <div className={s.table}>
            <thead className={s.table__head}>{tableHeaders}</thead>
            <tbody className={s.table__body}>{tableBody ? tableBody : <Spinner />}</tbody>
        </div>
    );
};

export default Table;

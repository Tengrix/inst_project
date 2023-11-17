import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

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
    const [sortState, setSortState] = useState<SortState>({ email: 'asc', createdAt: 'asc' });
    const t = useTranslations();

    const handleSort = (key: string) => {
        const newDirection = sortState[key] === 'asc' ? 'desc' : 'asc';
        headers[key].onSort!(newDirection);
        setSortState({ ...sortState, [key]: newDirection });
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
                <span onClick={() => headerItem.sortable && handleSort(key)}>
                    {sortState[key] === 'desc' ? '↑' : '↓'}
                </span>
            )}
        </th>
    ));

    const tableBody = data.map((row, i) => (
        <tr key={i} className={s.table__tr}>
            {Object.entries(row).map(([key, value]) => !key.startsWith('_') && getRow(key, value))}
        </tr>
    ));

    return (
        <div className={s.table}>
            <thead className={s.table__head}>{tableHeaders}</thead>
            <tbody className={s.table__body}>{tableBody}</tbody>
        </div>
    );
};

export default Table;

import { useTranslations } from 'next-intl';
import React from 'react';

import s from './Table.module.scss';

type TableProps = {
    data: Array<object>;
    header: { [key: string]: string };
};

const Table = ({ data, header }: TableProps) => {
    const t = useTranslations();
    const getRow = (key: string, value: string) => {
        return (
            <td className={`${s.table__cell} ${s.cell}`}>
                <div className={s.cell__th}>{t(header[key])}</div>
                <div className={s.cell__td}>{value}</div>
            </td>
        );
    };

    return (
        <div className={s.table}>
            <thead className={s.table__head}>
                {Object.entries(header).map(([key, value]) => (
                    <th key={key} className={s.table__th}>
                        {t(value)}
                    </th>
                ))}
            </thead>
            <tbody className={s.table__body}>
                {data.map((row, i) => (
                    <tr key={i} className={s.table__tr}>
                        {Object.entries(row).map(([key, value]) => getRow(key, value))}
                    </tr>
                ))}
            </tbody>
        </div>
    );
};

export default Table;

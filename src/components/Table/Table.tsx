import React from 'react';
import './Table.scss';

type TableProps = {
    data: Array<object>;
    header: { [key: string]: string };
};

const Table = ({ data, header }: TableProps) => {
    const getRow = (key: string, value: string) => {
        return (
            <td className="table__cell cell">
                <div className="cell__th">{header[key]}</div>
                <div className="cell__td">{value}</div>
            </td>
        );
    };

    return (
        <div className="table">
            <thead className="table__head">
                {Object.entries(header).map(([key, value]) => (
                    <th key={key} className="table__th">
                        {value}
                    </th>
                ))}
            </thead>
            <tbody className="table__body">
                {data.map((row, i) => (
                    <tr key={i} className="table__tr">
                        {Object.entries(row).map(([key, value]) => getRow(key, value))}
                    </tr>
                ))}
            </tbody>
        </div>
    );
};

export default Table;

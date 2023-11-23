import Select, { ItemType } from '@/shared/ui/select/Select';

import s from './per-page-select.module.scss';
/* eslint-disable */
export type PerPageSelectPropsType = {
    perPage: number;
    perPageOptions: number[];
    onPerPageChange: (itemPerPage: number) => void;
};

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectPropsType) => {
    const items = perPageOptions.reduce((acc: ItemType[], cur) => {
        acc.push({ value: cur.toString(), label: cur.toString() });
        return acc;
    }, []);
    return (
        <div className={s.selectBox}>
            Show{'   '}
            <Select
                items={items}
                defaultValue={items.filter(item => +item.value == perPage)[0]}
                onValueChange={(value)=>onPerPageChange(+value)}
            />
            on page
        </div>
    );
};

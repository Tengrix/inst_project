import s from './per-page-select.module.scss';
/* eslint-disable */
export type PerPageSelectPropsType = {
    perPage: number;
    perPageOptions: number[];
    onPerPageChange: (itemPerPage: number) => void;
};

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectPropsType) => {
    return (
        <div className={s.selectBox}>
            {/*//Todo need to fix select*/}
            Show{'   '}
            {/*<Select value={perPage} options={perPageOptions} onValueChange={onPerPageChange} />*/}
            on page
        </div>
    );
};

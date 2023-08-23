import clsx from 'clsx';

import { Typography } from '@/shared/ui/typography';

import s from './page-button.module.scss';

export type NavigationButtonPropsType = {
    onClick: () => void;
    disabled?: boolean;
};

type PageButtonPropsType = NavigationButtonPropsType & {
    page: number;
    selected: boolean;
};

export const PageButton = ({ onClick, disabled, selected, page }: PageButtonPropsType) => {
    const classNames = {
        button: clsx(s.pageButton, selected && s.selected),
        typography: clsx(selected && s.selectedPageNumber)
    };

    return (
        <button onClick={onClick} disabled={selected || disabled} className={classNames.button}>
            <Typography className={classNames.typography} variant={'regular14'}>
                {page}
            </Typography>
        </button>
    );
};

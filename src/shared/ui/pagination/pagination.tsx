import { MainPaginationButtons } from '@/shared/ui/pagination/main-pagination-buttons';
import { NextButton, PrevButton } from '@/shared/ui/pagination/navigation-buttons';
import { PerPageSelect } from '@/shared/ui/pagination/per-page-select';

import s from './pagination.module.scss';
import { usePagination } from './usePagination';

type PaginationConditionals =
    | {
          perPage?: null;
          perPageOptions?: never;
          onPerPageChange?: never;
      }
    | {
          perPage: number;
          perPageOptions: number[];
          onPerPageChange?: (itemPerPage: number) => void;
      };

export type PaginationProps = {
    totalCount?: number;
    page?: number;
    // eslint-disable-next-line no-unused-vars
    onChange?: (page: number) => void;
    siblings?: number;
    perPage?: number | null;
    perPageOptions?: number[];
    // eslint-disable-next-line no-unused-vars
    onPerPageChange?: (itemPerPage: number) => void;
} & PaginationConditionals;

export const Pagination = ({
    onChange,
    totalCount = 10,
    page = 1,
    perPage = null,
    perPageOptions,
    onPerPageChange,
    siblings
}: PaginationProps) => {
    const {
        paginationRange,
        isLastPage,
        isFirstPage,
        handlePreviousPageClicked,
        handleNextPageClicked,
        handleMainPageClicked
    } = usePagination({
        totalCount,
        page,
        siblings,
        onChange
    });

    const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange;

    return (
        <div className={s.root}>
            <div className={s.container}>
                <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

                <MainPaginationButtons
                    currentPage={page}
                    onClick={handleMainPageClicked}
                    paginationRange={paginationRange}
                />

                <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
            </div>

            {showPerPageSelect && (
                <PerPageSelect perPageOptions={perPageOptions} onPerPageChange={onPerPageChange} perPage={perPage} />
            )}
        </div>
    );
};

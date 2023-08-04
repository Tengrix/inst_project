import {Dots} from "@/shared/ui/pagination/main-pagination-buttons/dots";
import {PageButton} from "@/shared/ui/pagination/main-pagination-buttons/page-button";


type MainPaginationButtonsPropsType = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

export const MainPaginationButtons = ({
  paginationRange,
  currentPage,
  onClick,
}: MainPaginationButtonsPropsType) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') return <Dots key={index} />

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}

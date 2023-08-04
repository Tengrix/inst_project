import s from './navigation-buttons.module.scss'
import KeyboardArrowRight from "@/assets/icons/key-board-arrow-right";
import KeyboardArrowLeft from "@/assets/icons/key-board-arrow-left";



type NavigationButtonProps = {
  disabled: boolean
  onClick: () => void
}

export const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.arrowBtn} onClick={onClick} disabled={disabled}>
      <KeyboardArrowLeft color={disabled ? 'var(--color-dark-100)' : 'var(--color-light-100'} />
    </button>
  )
}

export const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.arrowBtn} onClick={onClick} disabled={disabled}>
      <KeyboardArrowRight color={disabled ? 'var(--color-dark-100)' : 'var(--color-light-100'} />
    </button>
  )
}

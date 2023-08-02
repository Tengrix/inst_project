import { ComponentPropsWithoutRef, ReactNode } from 'react'


import s from './card.module.scss'
import clsx from "clsx";

type CardPropsType = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, className }: CardPropsType) => {
  const classNames = {
    root: clsx(s.card, className),
  }

  return <div className={classNames.root}>{children}</div>
}

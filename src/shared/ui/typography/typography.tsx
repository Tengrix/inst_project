import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T // h1 h2 h3
  className?: string
  color?: 'primary' | 'secondary' | 'inherit' | 'link' | 'error' | 'tertiary' | 'form'
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'bold16'
    | 'regular16'
    | 'bold14'
    | 'medium14'
    | 'regular14'
    | 'bold-small'
    | 'small'
    | 'link-small'
    | 'regular-link'
    | 'error'
} & ComponentPropsWithoutRef<T>

// С помощью Omit мы убираем из пропсов переданного компонента все пропсы,
// которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'body1', color = 'primary', className, as: Component = 'p', ...rest } = props

  return <Component className={`${variant && s[variant]} ${s[color]}  ${className}`} {...rest} />
}

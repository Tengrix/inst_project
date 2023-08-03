import React, {ReactNode, KeyboardEvent, FC, useState, ComponentPropsWithoutRef} from 'react'

import * as Label from '@radix-ui/react-label'
import clsx from 'clsx'

import s from './text-field.module.scss'
import {Typography} from "@/shared/ui/typography";
import SearchIcon from "../../../../public/icon/search-icon";
import EyeIcon from "../../../../public/icon/eye-icon";
import EyeOffIcon from "../../../../public/icon/eye-off-icon";
import CloseIcon from "../../../../public/icon/close-icon";

export type TextFieldProps = {
  value?: string
  label?: string
  errorMessage?: string
  iconStart?: ReactNode
  iconEnd?: ReactNode
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  onClearValue?: () => void
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  disabled,
  value,
  type,
  label,
  errorMessage,
  iconStart,
  iconEnd,
  onEnter,
  onKeyDown,
  onClearValue,
  className,
  ...rest
}) => {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const showError = errorMessage && errorMessage.length > 0

  if (type === 'search') {
    iconStart = <SearchIcon />
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e)
    }
    onKeyDown?.(e)
  }
  const handleDoubleClick = () => {
    if (inputRef) {
      inputRef.select()
    }
  };
  const classNames = {
    root: clsx(s.root, className),
    input: clsx(s.input, showError && s.error),
    iconButton: clsx(s.iconButton, disabled && s.disabled),
    iconStart: clsx(s.iconStart),
  }
  const showClearValueIcon = !iconEnd && !showError && onClearValue && value?.length! > 0
  const dataIconStart = iconStart ? 'start' : ''
  const dataIconEnd = iconEnd || showClearValueIcon ? 'end' : ''
  const dataIcon = dataIconStart + dataIconEnd
  const onClickShowValue = () => {
    if (!disabled) {
      setShowPassword(!showPassword)
    }
  }

  return (
    <div className={classNames.root}>
      <Label.Root>
        <Typography variant={'body2'} color={'inherit'}>
          {label}
        </Typography>
        <div className={s.inputContainer}>
          {iconStart && <span className={s.iconStart}>{iconStart}</span>}
          <input
              ref={(ref) => setInputRef(ref)}
            value={value}
            disabled={disabled}
            data-icon={dataIcon}
            className={classNames.input}
            type={showPassword ? 'text' : type}
            onKeyDown={handleKeyDown}
            onDoubleClick={handleDoubleClick}
            {...rest}
          />

          {type === 'password' && (
            <button className={classNames.iconButton} type="button" onClick={onClickShowValue}>
              {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}

          {showClearValueIcon && (
            <button className={classNames.iconButton} onClick={onClearValue} type="button">
              {<CloseIcon />}
            </button>
          )}

          {iconEnd && <span className={s.iconEnd}>{iconEnd}</span>}
        </div>
      </Label.Root>
      {showError && (
        <Typography variant={'error'} color={'error'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}

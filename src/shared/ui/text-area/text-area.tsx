import * as Label from '@radix-ui/react-label';
import clsx from 'clsx';
import React, { ComponentProps, FC, KeyboardEvent } from 'react';

import { Typography } from '@/shared/ui/typography';

import s from './TextArea.module.scss';

export type TextAreaFieldProps = {
    value?: string;
    label?: string;
    errorMessage?: string;
    cols?: number;
    disabled?: boolean;
    maxlength?: number;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    placeholder?: string;
    form?: string | number;
    autofocus?: boolean;
    // eslint-disable-next-line no-unused-vars
    onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onClearValue?: () => void;
    className?: string;
} & ComponentProps<'textarea'>;

export const TextArea: FC<TextAreaFieldProps> = ({
    disabled,
    value,
    label,
    errorMessage,
    // onEnter,
    onKeyDown,
    // onClearValue,
    className,
    maxLength = 501,
    ...rest
}) => {
    const showError = errorMessage && errorMessage.length > 0;

    const classNames = {
        root: clsx(s.root, className),
        textarea: clsx(s.textarea, showError && s.error),
        iconButton: clsx(s.iconButton, disabled && s.disabled),
        iconStart: clsx(s.iconStart)
    };
    return (
        <div className={classNames.root}>
            <Label.Root>
                <Typography variant={'regular14'} color={'form'} className={s.errorLabelText}>
                    {label}
                </Typography>
                <div className={s.textAreaContainer}>
                    <textarea
                        value={value}
                        disabled={disabled}
                        className={classNames.textarea}
                        onKeyDown={onKeyDown}
                        maxLength={maxLength}
                        {...rest}
                    />
                </div>
            </Label.Root>
            {showError && (
                <Typography variant={'error'} color={'error'} className={s.errorMessageText}>
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};
//  закомментирован код в typography.module.scss : .error{} ошибка под textarea имеет дефолтный цвет//

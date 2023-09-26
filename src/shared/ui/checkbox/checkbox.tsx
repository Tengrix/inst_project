import * as CheckboxRadix from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { FC } from 'react';

import { CheckIcon } from 'public/icon/check-icon';

import s from './checkbox.module.scss';

export type CheckboxPropsType = {
    checked: boolean | string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    id?: string;
    className?: string;
};

export const Checkbox: FC<CheckboxPropsType> = ({ checked, onChange, disabled, required, label }) => {
    const classNames = {
        container: s.container,
        buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
        root: clsx(s.root, checked && s.checked, disabled && s.disabled),
        indicator: clsx(s.indicator, disabled && s.disabled),
        label: clsx(s.label, disabled && s.disabled)
    };

    return (
        <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
                className={classNames.root}
                checked={Boolean(checked)}
                onCheckedChange={onChange}
                disabled={disabled}
                required={required}>
                {checked && (
                    <CheckboxRadix.Indicator className={classNames.indicator}>
                        <CheckIcon color={disabled ? 'var(--color-light-700' : 'black'} />
                    </CheckboxRadix.Indicator>
                )}
            </CheckboxRadix.Root>
        </div>
    );
};

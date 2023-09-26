import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import * as SelectComponent from '@radix-ui/react-select';
import Image from 'next/image';
import React, { useState } from 'react';

import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import s from 'src/shared/ui/select/Select.module.scss';

type ItemType = {
    language: string;
    icon?: any;
    locale?: string;
};
type SelectPropsType = {
    selectLabel?: string;
    placeHolder?: string;
    items: ItemType[];
    defaultValue?: ItemType;
    // eslint-disable-next-line no-unused-vars
    onValueChange: (item: string) => void;
    disabled?: boolean;
};

const Select = ({
    selectLabel,
    placeHolder,
    items,
    onValueChange,
    disabled = false,
    defaultValue
}: SelectPropsType) => {
    const onValueChangeHandler = (e: string) => {
        onValueChange(e);
    };

    const renderingItems = items.map(item => (
        <SelectComponent.Item key={item.language.toLowerCase()} className={s.SelectItem} value={item.locale || 'en'}>
            {item.icon && (
                <SelectComponent.Icon className={s.SelectIcon}>
                    <Image
                        src={item.icon.src}
                        width={item.icon.width}
                        height={item.icon.height}
                        alt={`Language ${item.language}`}
                    />
                </SelectComponent.Icon>
            )}
            <SelectComponent.ItemText>{item.language}</SelectComponent.ItemText>
            <SelectComponent.ItemIndicator className={s.SelectComponentItemIndicator}>
                <CheckIcon />
            </SelectComponent.ItemIndicator>
        </SelectComponent.Item>
    ));

    return (
        <div className={s.container}>
            {selectLabel && (
                <Label className={s.label} htmlFor={selectLabel.toLowerCase()}>
                    {selectLabel}
                </Label>
            )}
            <SelectComponent.Root disabled={disabled} onValueChange={onValueChangeHandler}>
                <SelectComponent.Trigger id={selectLabel ? selectLabel.toLowerCase() : ''} className={s.SelectTrigger}>
                    {defaultValue && (
                        <SelectComponent.Icon className={s.SelectIcon}>
                            <Image src={defaultValue?.icon.src} width={30} height={30} alt="language icon" />
                        </SelectComponent.Icon>
                    )}
                    <SelectComponent.Value placeholder={placeHolder ? placeHolder : defaultValue?.language} />
                    <SelectComponent.Icon className={s.SelectIcon}>
                        <ChevronDownIcon />
                    </SelectComponent.Icon>
                </SelectComponent.Trigger>

                <SelectComponent.Portal>
                    <SelectComponent.Content position="popper" sideOffset={5} className={s.SelectContent}>
                        <SelectComponent.ScrollUpButton className={s.SelectScrollButton}>
                            <ChevronUpIcon />
                        </SelectComponent.ScrollUpButton>
                        <SelectComponent.Viewport>{renderingItems}</SelectComponent.Viewport>
                        <SelectComponent.ScrollDownButton className={s.SelectScrollButton} />
                        <SelectComponent.Arrow />
                    </SelectComponent.Content>
                </SelectComponent.Portal>
            </SelectComponent.Root>
        </div>
    );
};

export default Select;

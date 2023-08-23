import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import * as SelectComponent from '@radix-ui/react-select';
import React, { ReactNode, useState } from 'react';

import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import s from 'src/shared/ui/select/Select.module.scss';

type ItemType = {
    title: string;
    icon?: ReactNode;
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
    const [value, setValue] = useState('');
    const curValueIcon = value ? items.filter(item => item.title === value)[0].icon : defaultValue?.icon;

    const onValueChangeHandler = (e: string) => {
        onValueChange(e);
        setValue(e);
    };

    const renderingItems = items.map(item => (
        <SelectComponent.Item key={item.title.toLowerCase()} className={s.SelectItem} value={item.title}>
            {item.icon && <SelectComponent.Icon className={s.SelectIcon}>{item.icon}</SelectComponent.Icon>}
            <SelectComponent.ItemText>{item.title}</SelectComponent.ItemText>
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
                    {curValueIcon}
                    <SelectComponent.Value placeholder={placeHolder ? placeHolder : defaultValue?.title} />
                    <SelectComponent.Icon className={s.SelectIcon}>
                        <ChevronDownIcon />
                    </SelectComponent.Icon>
                </SelectComponent.Trigger>

                <SelectComponent.Portal>
                    <SelectComponent.Content position="popper" sideOffset={5} className={s.SelectContent}>
                        <SelectComponent.ScrollUpButton className={s.SelectScrollButton}>
                            <ChevronUpIcon />
                        </SelectComponent.ScrollUpButton>
                        <SelectComponent.Viewport>
                            {renderingItems}
                            {/*<SelectComponent.Separator/>*/}
                        </SelectComponent.Viewport>
                        <SelectComponent.ScrollDownButton className={s.SelectScrollButton} />
                        <SelectComponent.Arrow />
                    </SelectComponent.Content>
                </SelectComponent.Portal>
            </SelectComponent.Root>
        </div>
    );
};

export default Select;

import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import * as SelectComponent from '@radix-ui/react-select';
import { ReactNode } from 'react';

import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import s from 'src/shared/ui/select/Select.module.scss';

export type ItemType = {
    label: string;
    value: string;
    icon?: ReactNode;
};
type SelectPropsType = {
    selectLabel?: string;
    placeHolder?: string;
    items: ItemType[];
    defaultValue?: ItemType;
    onValueChange: (value: string) => void;
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
        <SelectComponent.Item key={item.label.toLowerCase()} className={s.SelectItem} value={item.value || 'en'}>
            {item.icon && <SelectComponent.Icon className={s.SelectIcon}>{item.icon}</SelectComponent.Icon>}
            <SelectComponent.ItemText>{item.label}</SelectComponent.ItemText>
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
                    {defaultValue?.icon && (
                        <SelectComponent.Icon className={s.SelectIcon}>{defaultValue.icon}</SelectComponent.Icon>
                    )}
                    <SelectComponent.Value placeholder={placeHolder ? placeHolder : defaultValue?.label} />
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

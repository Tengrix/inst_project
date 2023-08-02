import React, {ReactNode} from 'react';
import * as SelectComponent from '@radix-ui/react-select';
import s from 'src/shared/ui/select/Select.module.scss';
import {CheckIcon} from '@radix-ui/react-icons';
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";
import {Label} from "@radix-ui/react-label";

type ItemType = {
    title: string
    icon?: ReactNode
}
type SelectPropsType = {
    selectLabel?: string
    placeHolder?: string
    items: ItemType[]
    onValueChange: (item: string) => void
    disabled?: boolean
}

const Select = ({selectLabel, placeHolder, items, onValueChange, disabled = false}: SelectPropsType) => {

        const renderingItems = items.map(item => (
            <SelectComponent.Item key={item.title.toLowerCase()} className={s.SelectItem} value={item.title}>
                {item.icon && <SelectComponent.Icon className={s.SelectIcon}>
                    {item.icon}
                </SelectComponent.Icon>}
                <SelectComponent.ItemText>{item.title}</SelectComponent.ItemText>
                <SelectComponent.ItemIndicator className={s.SelectComponentItemIndicator}>
                    <CheckIcon/>
                </SelectComponent.ItemIndicator>
            </SelectComponent.Item>)
        )

        return (
            <div className={s.container}>
                {selectLabel &&
                    <Label className={s.label} htmlFor={selectLabel.toLowerCase()}>
                        {selectLabel}
                    </Label>}
                <SelectComponent.Root disabled={disabled} onValueChange={(e) => onValueChange(e)}>
                    <SelectComponent.Trigger id={selectLabel ? selectLabel.toLowerCase() : ''} className={s.SelectTrigger}>
                        <SelectComponent.Value placeholder={placeHolder ? placeHolder : items[0].title}/>
                        <SelectComponent.Icon className={s.SelectIcon}>
                            <ChevronDownIcon/>
                        </SelectComponent.Icon>
                    </SelectComponent.Trigger>

                    <SelectComponent.Portal>
                        <SelectComponent.Content position="popper" sideOffset={5} className={s.SelectContent}>
                            <SelectComponent.ScrollUpButton className={s.SelectScrollButton}>
                                <ChevronUpIcon/>
                            </SelectComponent.ScrollUpButton>
                            <SelectComponent.Viewport className={s.SelectViewport}>
                                {renderingItems}
                                {/*<SelectComponent.Separator/>*/}
                            </SelectComponent.Viewport>
                            <SelectComponent.ScrollDownButton className={s.SelectScrollButton}/>
                            <SelectComponent.Arrow/>
                        </SelectComponent.Content>
                    </SelectComponent.Portal>
                </SelectComponent.Root>
            </div>
        );
    }
;

export default Select;
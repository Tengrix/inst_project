import React, {ReactNode} from 'react';
import * as Popover from '@radix-ui/react-popover';
import {Cross2Icon} from '@radix-ui/react-icons';
import s from './Popover.module.css';

const CustomPopover = ({children, contentChildren}: { children: ReactNode, contentChildren: ReactNode }) => (
    <Popover.Root>
        <Popover.Trigger asChild>
            {children}
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content className={s.PopoverContent} sideOffset={5}>
                {contentChildren}
                <Popover.Close className={s.PopoverClose} aria-label="Close">
                    <Cross2Icon/>
                </Popover.Close>
                <Popover.Arrow className={s.PopoverArrow}/>
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default CustomPopover;
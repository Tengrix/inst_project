import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import React, { ReactNode } from 'react';

import s from './Popover.module.css';

const CustomPopover = ({ icon, contentChildren }: { icon: ReactNode; contentChildren: ReactNode }) => (
    <Popover.Root>
        <Popover.Trigger asChild>{icon}</Popover.Trigger>
        <Popover.Portal>
            <Popover.Content className={s.PopoverContent} sideOffset={5}>
                {contentChildren}
                {/*<Popover.Close className={s.PopoverClose} aria-label="Close">*/}
                {/*    <Cross2Icon />*/}
                {/*</Popover.Close>*/}
                <Popover.Arrow className={s.PopoverArrow} />
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default CustomPopover;

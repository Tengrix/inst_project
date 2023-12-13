import { useState } from 'react';

import CustomPopover from '@/shared/ui/popover/Popover';
import { HorizontalDotsIcon } from 'public/assets/icons/HorizontalDotsIcon';

import UserActions from '../UserActions/UserActions';

export const AdminActions = () => {
    const [editPost, setEditPost] = useState<boolean>(false);
    const editModeHandler = () => setEditPost(true);
    return (
        <CustomPopover
            icon={
                <div>
                    <HorizontalDotsIcon />
                </div>
            }
            contentChildren={<UserActions />}
        />
    );
};

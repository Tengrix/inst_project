import CustomPopover from '@/shared/ui/popover/Popover';
import { HorizontalDotsIcon } from 'public/assets/icons/HorizontalDotsIcon';

import UserActions from '../UserActions/UserActions';

export const AdminActions = () => {
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

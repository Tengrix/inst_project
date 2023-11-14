import { ReactElement } from 'react';

import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { UserRouting } from '@/components/UserRouting/UserRouting';

import s from './WithSidebarLayout.module.scss';

export const getLayoutWithSidebar = (page: ReactElement) => {
    return (
        <BaseLayout>
            <div className={s.container}>
                <UserRouting />
                <div className={s.page}>{page}</div>
            </div>
        </BaseLayout>
    );
};

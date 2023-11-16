import { ReactElement } from 'react';

import { AdminRouting } from '@/components/AdminRouting/AdminRouting';
import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { UserRouting } from '@/components/UserRouting/UserRouting';

import s from './WithSidebarAdminLayout.module.scss';

export const getLayoutWithAdminSidebar = (page: ReactElement) => {
    return (
        <BaseLayout>
            <div className={s.container}>
                <AdminRouting />
                <div className={s.page}>{page}</div>
            </div>
        </BaseLayout>
    );
};

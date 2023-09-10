import { ReactElement } from 'react';

import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import Sidebar from '@/components/Sidebar/Sidebar';

import s from './WithSidebarLayout.module.css';

export const getLayoutWithSidebar = (page: ReactElement) => {
    return (
        <BaseLayout>
            <div className={s.container}>
                <Sidebar />
                <div className={s.page}>{page}</div>
            </div>
        </BaseLayout>
    );
};

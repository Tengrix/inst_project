import { ReactElement } from 'react';

import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { UserRouting } from '@/components/UserRouting/UserRouting';
import s from 'src/components/Layout/UserLayout/UserLayout.module.scss';

export const getUserLayout = (page: ReactElement) => {
    return (
        <BaseLayout>
            <div className={s.container}>
                <UserRouting />
                <div className={s.page}>{page}</div>
            </div>
        </BaseLayout>
    );
};

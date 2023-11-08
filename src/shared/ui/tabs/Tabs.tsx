import * as Tabs from '@radix-ui/react-tabs';
import React, { ReactNode } from 'react';

import s from 'src/shared/ui/tabs/Tabs.module.scss';

type TabType = {
    value: string;
    title: string;
    children: ReactNode;
};

type TabsPropsType = {
    tabs: TabType[];
    defaultTab?: string;
};
const CustomTabs = ({ tabs, defaultTab }: TabsPropsType) => {
    return (
        <Tabs.Root className={s.TabsRoot} defaultValue={defaultTab === undefined ? tabs[0].value : defaultTab}>
            <Tabs.List className={s.TabsList}>
                {tabs.map(el => (
                    <Tabs.Trigger key={el.title} className={s.TabsTrigger} value={el.value}>
                        {el.title}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {tabs.map(el => (
                <Tabs.Content key={el.title} className={s.TabsContent} value={el.value}>
                    <fieldset className={s.Fieldset}>{el.children}</fieldset>
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};

export default CustomTabs;

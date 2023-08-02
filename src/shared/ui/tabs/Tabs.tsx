import React, {ReactNode} from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import s from './Tabs.module.css'

type TabType = {
    title: string;
    children: ReactNode
}

type TabsPropsType = {
    tabs: TabType[];
}
const CustomTabs = ({tabs}: TabsPropsType) => {
    return (
        <Tabs.Root className={s.TabsRoot} defaultValue="tab1">
            <Tabs.List className={s.TabsList}>
                {tabs.map(el => <Tabs.Trigger key={el.title} className={s.TabsTrigger} value={el.title}>
                    {el.title}
                </Tabs.Trigger>)}
            </Tabs.List>
            {tabs.map(el =>
                <Tabs.Content key={el.title} className={s.TabsContent} value={el.title}>
                    <fieldset className={s.Fieldset}>
                        {el.children}
                    </fieldset>
                </Tabs.Content>
            )}
        </Tabs.Root>
    );
};

export default CustomTabs;

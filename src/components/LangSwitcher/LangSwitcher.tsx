import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Select from '@/shared/ui/select/Select';
import { PngToIcon } from '@/shared/utils/pngToIcon/PngToIcon';
import RuFlag from 'public/icon/ru.png';
import UkFlag from 'public/icon/uk.png';

type LanguageType = {
    [locale: string]: { label: string; icon: ReactNode };
};

const languages: LanguageType = {
    ru: {
        label: 'Русский',
        icon: <PngToIcon iconPath={RuFlag} width={30} height={30} />
    },
    en: {
        label: 'English',
        icon: <PngToIcon iconPath={UkFlag} width={30} height={30} />
    }
};
const LangSwitcher = () => {
    const { locale, push, pathname, query, asPath } = useRouter();

    const changeLangHandler = (item: string) => {
        push({ pathname, query }, asPath, { locale: item });
    };

    const items = Object.entries(languages).map(([locale, values]) => ({ value: locale, ...values }));
    const curItem = items.filter(item => item.value === locale)[0];

    return <Select defaultValue={curItem} items={items} onValueChange={changeLangHandler} />;
};
export default LangSwitcher;

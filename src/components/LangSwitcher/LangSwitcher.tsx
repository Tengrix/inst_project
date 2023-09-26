import { useRouter } from 'next/router';

import Select from '@/shared/ui/select/Select';
import RussiaFlag from 'public/icon/ru.png';
import UnitedKingdomFlag from 'public/icon/uk.png';

type LanguageType = {
    [locale: string]: { language: string; icon: any };
};

const languages: LanguageType = {
    ru: { language: 'Русский', icon: RussiaFlag },
    en: { language: 'English', icon: UnitedKingdomFlag }
};

const LangSwitcher = () => {
    const { locale, push, pathname, query, asPath } = useRouter();

    const changeLangHandler = (item: string) => {
        push({ pathname, query }, asPath, { locale: item });
    };

    const items = Object.entries(languages).map(([locale, values]) => ({ locale, ...values }));
    const curItem = languages[locale ?? 'en'];

    return <Select defaultValue={curItem} items={items} onValueChange={changeLangHandler} />;
};
export default LangSwitcher;

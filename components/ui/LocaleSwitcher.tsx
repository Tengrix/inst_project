'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { usePathname } from 'next-intl/client';

type Props = {
    options: Array<string>;
    locale: string;
};

export default function LocaleSwitcher({options, locale} : Props) {
    const t = useTranslations('commons');
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(pathname, {locale: e.target.value});
    };

    return (
        <select onClick={handleClick}>
            {options.map( (option: string) => {
                return <option className="locale-switcher__option" 
                               disabled={option === locale}
                               defaultValue={locale}
                               key={option}>
                            {option}
                        </option>
            })}
        </select>
    )
}

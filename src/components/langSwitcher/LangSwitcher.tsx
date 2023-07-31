import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export const LangSwitcher = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter();

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value;
    push({ pathname, query }, asPath, { locale });
  };

  return (
    <div>
      <select onChange={changeLangHandler} defaultValue={locale}>
        {locales?.map((lang) => {
          return (
            <option value={lang} key={lang}>
              {lang}
            </option>
          );
        })}
      </select>
    </div>
  );
};

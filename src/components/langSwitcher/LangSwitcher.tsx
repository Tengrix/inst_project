import Select from '@/shared/ui/select/Select';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export const LangSwitcher = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter();

  const changeLangHandler = (item: string) => {
    push({ pathname, query }, asPath, { locale: item });
  };

  return (
    <Select
      items={[
        { title: 'ru', icon: '' },
        { title: 'en', icon: '' },
      ]}
      onValueChange={changeLangHandler}
    />
  );
};

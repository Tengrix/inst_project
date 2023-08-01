import Select from '@/shared/ui/select/Select';
import {useRouter} from 'next/router';

export const LangSwitcher = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter();

  const changeLangHandler = async (item: string) => {
    //const locale = event.currentTarget.value;
    await push({ pathname, query }, asPath, { locale: item });
  };
  const items = locales?.map(el=> ({title:el, icon:``}))
  return (
    <Select
      items={items as any}
      onValueChange={changeLangHandler}
    />
  );
};

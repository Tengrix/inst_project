import { ReactNode } from 'react';
import { createTranslator } from 'next-intl';


type Props = {
  children: ReactNode;
};

export async function generateMetadata({params: {locale}}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = createTranslator({locale, messages});
 
  return {
    title: t('pages.auth.sign_up.title'),
    description: t('pages.auth.sign_up.meta_description'),
  };
}

export default function SignUpLayout({children}: Props) {
  return children;
}


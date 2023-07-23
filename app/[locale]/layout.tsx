import { headers } from 'next/headers'
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';


type Props = {
  children: ReactNode;
  params: {locale: string};
};

async function getImageFormatSupport() {
  const headersList = headers();
  const accept = headersList.get('accept');

  if (accept?.includes('image/avif')) {
    return 'support_avif'
  } else if (accept?.includes('image/webp')) {
    return 'support_webp'
  }

  return 'support_default'
}


async function generateStaticParams() {
  return ['en', 'ru'];
}


export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  const imageFormat = await getImageFormatSupport();
  const locales = await generateStaticParams();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={imageFormat}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="header">
            <div className="header__container">
              <LocaleSwitcher options={locales} locale={locale}/>
            </div>
          </header>
          {children}
          <footer className="footer">
            <div className="footer__container">
              <p className="footer__copyright">&copy; 2023</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
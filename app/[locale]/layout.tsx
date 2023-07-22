import { headers } from 'next/headers'
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';


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

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  const imageFormat = await getImageFormatSupport();
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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
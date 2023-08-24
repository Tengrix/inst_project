import { store } from '@/redux/store';

import '@/styles/variables/index.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

const inter = Inter({
    display: 'swap',
    style: ['normal'],
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700']
});

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => page);
    const { title, metaDescription, messages } = pageProps;

    return (
        <Provider store={store}>
            {getLayout(
                <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}>
                    <Head>
                        <title>{title}</title>
                        <meta name="description" content={metaDescription} />
                    </Head>
                    <NextIntlClientProvider messages={messages}>
                        {/* eslint-disable-next-line react/no-unknown-property */}
                        <style jsx global>
                            {`
                                :root {
                                    --font-family-main: ${inter.style.fontFamily}, sans-serif;
                                }
                            `}
                        </style>
                        <Component {...pageProps} />
                    </NextIntlClientProvider>
                </ReCaptchaProvider>
            )}
        </Provider>
    );
}

import '@/styles/variables/index.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Redirect } from '@/components/Redirect/Redirect';
import { store } from '@/redux/store';

const inter = Inter({
    display: 'swap',
    style: ['normal'],
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700']
});

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => page);
    const { title, metaDescription, messages, session } = pageProps;

    return (
        <Provider store={store}>
            <Redirect>
                <SessionProvider session={session}>
                    <NextIntlClientProvider messages={messages}>
                        {getLayout(
                            <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}>
                                <Head>
                                    <title>{title}</title>
                                    <meta name="description" content={metaDescription} />
                                </Head>
                                {/* eslint-disable-next-line react/no-unknown-property */}
                                <style jsx global>
                                    {`
                                        :root {
                                            --font-family-main: ${inter.style.fontFamily}, sans-serif;
                                        }
                                    `}
                                </style>
                                <Component {...pageProps} />
                            </ReCaptchaProvider>
                        )}
                    </NextIntlClientProvider>
                </SessionProvider>
            </Redirect>
        </Provider>
    );
}

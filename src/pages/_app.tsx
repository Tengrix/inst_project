import { store } from "@/store";
import '@/styles/variables/index.scss';
import { NextPage } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { Provider } from "react-redux";


const inter = Inter({
    display: 'swap',
    style: ['normal'],
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700']
})

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <Provider store={store}>
            <NextIntlClientProvider messages={pageProps.messages}>
                <style jsx global>{`
                    :root {--font-family-main: ${inter.style.fontFamily}, sans-serif}
                    body {
                        font-family: var(--font-family-main)
                    }
                `}</style>
                <Component {...pageProps} />
            </NextIntlClientProvider>
        </Provider>
    );
}

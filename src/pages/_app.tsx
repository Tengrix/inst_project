import { store } from "@/store";
import '@/styles/variables/index.scss';
import { NextPage } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from "react-redux";


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
                <Component {...pageProps} />
            </NextIntlClientProvider>
        </Provider>
    );
}

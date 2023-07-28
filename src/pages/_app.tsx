import type {AppProps} from 'next/app'
import React, {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import '@/styles/variables/index.scss'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <Component {...pageProps} />
    );
}

import type { AppProps } from 'next/app'
import React, {ReactElement, ReactNode, useState} from "react";
import {NextPage} from "next";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient)

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
  );
}

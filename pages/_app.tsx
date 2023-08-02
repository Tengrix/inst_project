import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { store } from '../redux/store';
import '../styles/globals.css';
import Header from '@/component/Header/Header';
import i18n from '../component/Header/Locales/i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </I18nextProvider>
  );
}

export default MyApp;
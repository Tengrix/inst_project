import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { FC } from 'react'; // Импортируем тип FC (Functional Component) из библиотеки React

import {store} from '../redux/store'; // Путь к вашему Redux store
import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;



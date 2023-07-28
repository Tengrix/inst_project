// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }


// _app.js
// import { Provider } from 'react-redux';
// import { store } from '../redux/store'; // import the store from your store file
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }

// export default MyApp;


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



import '@/styles/globals.scss';
import Head from 'next/head';

import { Provider } from 'react-redux';
import store from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

// import '@/styles/globals.scss';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

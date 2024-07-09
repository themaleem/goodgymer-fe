import Head from "next/head";
import { Provider } from "react-redux";

import getOrCreateStore from "../lib/axiosReduxStore";
import Notification from "../components/notification";

import "../public/styles/styles.css";

import "react-loading-skeleton/dist/skeleton.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={getOrCreateStore()}>
      {/* @todo setup error boundary if there's time */}
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        </Head>
        <Component {...pageProps} />
        <Notification />
      </>
    </Provider>
  );
};

export default MyApp;

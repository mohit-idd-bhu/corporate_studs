// // pages/_app.js
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

// pages/_app.js;
import Loader from '../src/components/Loader/Loader';
import {LoaderProvider} from '../src/context/LoaderContext';
import { useLoader } from '../src/context/LoaderContext';
import { useEffect } from 'react';
import Router from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { loading, setLoading } = useLoader();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, [setLoading]);

  return (
    <>
      {loading && <Loader />}
      <Component {...pageProps}/>
    </>
  );
}

export default function App(props) {
  return (
    <LoaderProvider>
      <MyApp {...props} />
    </LoaderProvider>
  );
}


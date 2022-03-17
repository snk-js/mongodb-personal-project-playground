import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default MyApp;

import { EuiProvider } from '@elastic/eui';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import '@/components/chart.css?num=1';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@elastic/eui/dist/eui_theme_light.css';
import '@/components/homepage.css';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EuiProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </EuiProvider>
  );
}

export default MyApp;

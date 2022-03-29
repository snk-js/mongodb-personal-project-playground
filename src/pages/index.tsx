import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width='300'
              height='300'
              src='/images/sort.png'
              alt='Sort Analytics logo'
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

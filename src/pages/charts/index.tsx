import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import nc from 'next-connect';

import { database } from '@/api-lib/middlewares';

import { GetServerSidePropsContext } from '@/types/nextjs';

const Line = dynamic(() => import('@/components/Charts/Line'), {
  ssr: false,
});

export default function ChartsPage({
  lineChartData,
}: {
  lineChartData: Array<{ [String: string]: any }>;
}) {
  return (
    <>
      <Head>
        <title>Hii</title>
      </Head>
      <div className='absolute block h-full w-full'>
        <Line data={lineChartData} />
        hello
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await nc().use(database).run(ctx.req, ctx.res);

  const { data: lineChartData } = await axios.get(
    'http://localhost:3000' + '/api/charts/line'
  );
  if (!lineChartData) {
    return {
      notFound: true,
    };
  }

  return { props: { lineChartData } };
}

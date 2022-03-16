import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Line = dynamic(() => import('@/components/Charts/Line'), {
  ssr: false,
});

export default function ChartsPage({ lineChartData }: { lineChartData: any }) {
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

export async function getServerSideProps(ctx: any) {
  // await nc().use(database).run(ctx.req, ctx.res);

  const { data: lineChartData } = await axios.get(
    'http://localhost:3000' + '/api/charts/line'
  );
  console.log({ lineChartData });

  // const lineChartData = await getLineChartData(ctx.req.db);

  // console.log(lineData);
  // if (!lineData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return { props: { ok: 'ok' } };
}

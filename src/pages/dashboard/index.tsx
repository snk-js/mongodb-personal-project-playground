import axios from 'axios';
import nc from 'next-connect';
import { useEffect } from 'react';

import Dashboard from '@/components/dashboards/bayc';

import * as QUERIES from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';

import { GetServerSidePropsContext } from '@/types/nextjs';

export default function MainDashboard(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  return <Dashboard />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { dashboard_aggregation_pipelines, dashboard_queries } = QUERIES;

  await nc().use(database).run(ctx.req, ctx.res);

  let lineAvg = [];
  let lineVolume = [];
  let highPrice = [];
  let lowPrice = [];
  let avgPrice = [];

  let bubbleAllSales = [];

  const date = [2022, 1, 1, 0, 0, 0, 0];

  const line = await axios.post('http://localhost:3000' + '/api/v0/aggregate', {
    pipeline: dashboard_aggregation_pipelines.lineAvgPriceOverTime,
  });

  const line2 = await axios.post(
    'http://localhost:3000' + '/api/v0/aggregate',
    {
      pipeline: dashboard_aggregation_pipelines.lineAvgPriceOverTime,
    }
  );

  const value1 = await axios.post(
    'http://localhost:3000' + '/api/v0/aggregate',
    {
      pipeline: 'highPrice',
      date,
    }
  );

  const value2 = await axios.post(
    'http://localhost:3000' + '/api/v0/aggregate',
    {
      pipeline: 'lowPrice',
      date,
    }
  );
  const value3 = await axios.post(
    'http://localhost:3000' + '/api/v0/aggregate',
    {
      pipeline: 'avgPrice',
      date,
    }
  );

  const bubblechart = await axios.post(
    'http://localhost:3000' + '/api/v0/transaction',
    { query: 'bubbleAllSales', date }
  );

  lineAvg = line.data.aggregateResult;
  lineVolume = line2.data.aggregateResult;
  highPrice = value1.data.aggregateResult;
  lowPrice = value2.data.aggregateResult;
  avgPrice = value3.data.aggregateResult;
  bubbleAllSales = bubblechart.data.transactionQuery || {};

  console.log(bubblechart.data);

  return {
    props: {
      lineAvg,
      lineVolume,
      highPrice,
      lowPrice,
      avgPrice,
      bubbleAllSales,
    },
  };
}

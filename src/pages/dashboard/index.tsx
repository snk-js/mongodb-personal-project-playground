import axios from 'axios';
import nc from 'next-connect';
import { useEffect, useState } from 'react';

import Dashboard from '@/components/dashboards/bayc';

import * as QUERIES from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';

import { GetServerSidePropsContext } from '@/types/nextjs';

export default function MainDashboard(props: { [string: string]: Array<any> }) {
  const [avgPrice, setAvgPrice] = useState(-1);
  const [highPrice, setHighPrice] = useState(-1);
  const [lowPrice, setLowPrice] = useState(-1);
  const [lineAverage, setLineAverage] = useState([{}]);
  const [lineVolume, setLineVolume] = useState([{}]);
  const [bubbleAllSales, setBubbleAllSales] = useState([{}]);

  useEffect(() => {
    setAvgPrice(props.avgPrice[0].maxQuantity);
    setHighPrice(props.highPrice[0].maxQuantity);
    setLowPrice(props.lowPrice[0].maxQuantity);
    setLineAverage(props.lineAverage);
    setLineVolume(props.lineVolume);
    setBubbleAllSales(props.bubbleAllSales);
  }, [
    setAvgPrice,
    setHighPrice,
    setLowPrice,
    setLineAverage,
    setLineVolume,
    setBubbleAllSales,
  ]);

  return (
    <Dashboard
      avgPrice={avgPrice}
      highPrice={highPrice}
      lowPrice={lowPrice}
      lineAverage={lineAverage}
      lineVolume={lineVolume}
      bubbleAllSales={bubbleAllSales}
    />
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { dashboard_aggregation_pipelines } = QUERIES;

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

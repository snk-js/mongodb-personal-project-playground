import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { parse } from 'query-string';

import { Aggregation } from '@/api-lib/db/';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { genAggPipe } from '@/utils/genAggPipe';

import { IAgreggateParams } from '@/types/api/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database);

interface AggregationArgs extends IAgreggateParams {
  limit?: number;
  pipeline?: any;
  date?: string;
}

interface RequestWithMiddleware extends NextApiRequest {
  db: Db;
}

handler.get(async (req: RequestWithMiddleware, res: NextApiResponse) => {
  const params = req.url;
  let query: IAgreggateParams | any = {
    contract_address: null,
    func: null,
    success: null,
    field: null,
    operation: null,
    group_by: null,
    num: null,
    date: null,
    'nft.event': null,
    'nft.contract': null,
  };

  if (params?.split('?')[1]) {
    query = parse(params.split('?')[1]);
  }

  const aggregateQueryParams: any = {};

  query &&
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        aggregateQueryParams[key] = query[key];
      }
    });

  if (!aggregateQueryParams['success']) aggregateQueryParams['success'] = 1;
  if (!aggregateQueryParams['num']) aggregateQueryParams['num'] = 24;

  const pipeline = genAggPipe(aggregateQueryParams);

  const aggregateResult = await Aggregation({
    db: req.db,
    pipeline,
  });

  return res.json({ aggregateResult });
});

export default handler;

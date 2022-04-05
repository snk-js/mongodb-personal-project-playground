import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { AggregationPost } from '@/api-lib/db/';
import { cors, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { genPipe } from '@/utils/mongoDb/aggregation/genPipe';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database, cors);

interface RequestWithMiddleware extends NextApiRequest {
  db?: Db;
  date?: any;
}

export type IFilter = {
  ct_addr?: string;
  ct_func?: string;
  tx_success: 1 | 0; // default 1
  tx_timestamp: any; // default now(), long EPOCH,
  nft?: string;
  nft_event?: string;
  coin_buy?: string;
  coin_sale?: string;
  coin_tx?: string;
};

export type IAggregate = {
  field: string | number;
  op:
    | 'avg'
    | 'count'
    | 'first'
    | 'last'
    | 'max'
    | 'min'
    | 'stdDevPop'
    | 'stdDevSamp'
    | 'sum';
  by?: 'day' | 'hour' | 'minute';
  limit: number | 50;
};

type IFields = {
  [string: string]: 0 | 1;
};

type ITransactionParams = {
  filter: IFilter;
  aggregate: IAggregate;
  limit: number;
  fields: IFields;
};

handler.post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
  const {
    filter,
    aggregate,
    limit,
    fields, // was return changed by name convention
  }: ITransactionParams = req.body;

  const pipeline = genPipe({
    filter,
    aggregate,
    limit,
    fields,
  });

  const aggregateResult = await AggregationPost({
    db: req.db,
    pipeline,
  });

  return res.json([...aggregateResult]);
});

export default handler;

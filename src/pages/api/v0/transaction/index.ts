import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { Transaction } from '@/api-lib/db/';
import { dashboard_queries } from '@/api-lib/db/transaction/queries';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';

import { ITransactionParams } from '@/types/api/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database);

interface AggregationArgs extends ITransactionParams {
  limit: number;
  query: any;
  date: [];
}

interface RequestWithMiddleware extends NextApiRequest {
  db: Db;
}

handler.post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
  const {
    // contract_address,
    // limit,
    // func,
    // success,
    // num,
    // starting_before,
    // collapse,
    // contains_address,
    query,
    date,
  }: AggregationArgs = req.body;

  const transactionQuery = await Transaction({
    db: req.db,
    config: dashboard_queries[query],
    date,
  });

  return res.json({ transactionQuery });
});

export default handler;

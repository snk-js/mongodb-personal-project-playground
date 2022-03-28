import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { Transaction } from '@/api-lib/db/';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { genTransactionPipe } from '@/utils/genTransactionPipe';

import { ITransactionParams } from '@/types/api/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database);

interface AggregationArgs extends ITransactionParams {
  date: string;
}

interface RequestWithMiddleware extends NextApiRequest {
  db: Db;
}

handler.post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
  const {
    contract_address,
    func,
    success,
    num,
    starting_before,
    collapse,
    contains_address,
    date,
  }: AggregationArgs = req.body;

  const pipeline = genTransactionPipe({
    contract_address,
    func,
    success,
    starting_before,
    collapse,
    num,
    date,
    contains_address,
  });

  const transactionQuery = await Transaction({
    db: req.db,
    pipeline,
  });

  return res.json({ transactionQuery });
});

export default handler;

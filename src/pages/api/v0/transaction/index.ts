import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { Transaction } from '@/api-lib/db/';
import { TransactionById } from '@/api-lib/db/';
import { cors, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { genTransactionPipe } from '@/utils/mongoDb/transaction/genTransactionPipe';

import { ITransactionParams } from '@/types/api/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database, cors);

interface TransactionArgs extends ITransactionParams {
  date: string;
  id;
}

interface RequestWithMiddleware extends NextApiRequest {
  db: Db;
}

handler
  .post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const {
      contract_address,
      func,
      success,
      num,
      starting_before,
      collapse,
      contains_address,
      date,
      id,
    }: TransactionArgs = req.body;

    let transactionQuery: any = {};

    // if only receives ID, just call by that id
    if (id && [...req.body].length === 1) {
      transactionQuery = await TransactionById({
        db: req.db,
        // @ts-ignore
        id,
      });
    } else {
      // if receives more than one param, call by params
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

      transactionQuery = await Transaction({
        db: req.db,
        pipeline,
      });
    }

    return res.json({ transactionQuery });
  })
  .get(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const { id }: any = req.query;

    const transaction = await TransactionById({
      db: req.db,
      // @ts-ignore
      id,
    });

    return res.json({ transaction });
  });

export default handler;

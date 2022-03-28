import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { TransactionById } from '@/api-lib/db/';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler.use(database);
interface RequestWithMiddleware extends NextApiRequest {
  db?: Db;
  date?: any;
}

handler
  .post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const { id }: any = req.query;

    const transaction = await TransactionById({
      db: req.db,
      // @ts-ignore
      id: id,
    });

    return res.json({ transaction });
  })
  .get(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const { id }: any = req.query;

    console.log({ id });

    const transaction = await TransactionById({
      db: req.db,
      // @ts-ignore
      id,
    });

    console.log(transaction);

    return res.json({ transaction });
  });

export default handler;

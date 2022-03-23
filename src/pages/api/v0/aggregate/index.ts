import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { parse } from 'query-string';

import { Aggregation } from '@/api-lib/db/';
import { dashboard_aggregation_pipelines } from '@/api-lib/db/aggregation/pipelines';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';

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

handler
  .post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const {
      // contract_address,
      // limit,
      // func,
      // success,
      // field,
      // operation,
      // group_by,
      // num,
      date,
      pipeline,
    }: AggregationArgs = req.body;

    const aggregateResult = await Aggregation({
      db: req.db,
      // @ts-ignore
      pipeline: date ? dashboard_aggregation_pipelines[pipeline] : pipeline,
      date: date ?? undefined,
    });

    return res.json({ aggregateResult });
  })
  .get(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const params = req.url;
    let query;

    if (params?.split('?')[1]) {
      query = parse(params.split('?')[1]);
    }

    console.log(query['contract_address']); //hello

    // const {
    //   contract_address,
    //   limit,
    //   func,
    //   success,
    //   field,
    //   operation,
    //   group_by,
    //   num,
    //   date,
    // }: any = req.query;

    // const { query } = QueryString.parseUrl(req.url);

    // const aggregateResult = await Aggregation({
    //   db: req.db,
    //   // @ts-ignore
    //   pipeline: date ? dashboard_aggregation_pipelines[pipeline] : pipeline,
    //   date: date ?? undefined,
    // });

    return res.json({ ok: 'ok' });
  });

export default handler;

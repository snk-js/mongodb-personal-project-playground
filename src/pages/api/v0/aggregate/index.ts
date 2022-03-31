import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { parse } from 'query-string';

import { Aggregation, AggregationPost } from '@/api-lib/db/';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { genAggPipe } from '@/utils/genAggPipe';

import { IAgreggateParams } from '@/types/api/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

handler.use(database);
interface RequestWithMiddleware extends NextApiRequest {
  db?: Db;
  date?: any;
}

let query: IAgreggateParams | any = {
  contract_address: null,
  func: null,
  success: null,
  field: null,
  operation: null,
  group_by: null,
  num: null,
  date: '',
  'nft.event': null,
  'nft.contract': null,
};

handler
  .post(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const {
      date,
      contract_address,
      func,
      success,
      field,
      operation,
      group_by,
      num,
      nft_event,
      nft_contract,
    }: any = req.body;

    const pipeline = genAggPipe({
      contract_address,
      date,
      func,
      success,
      field,
      operation,
      group_by,
      num,
      'nft.event': nft_event,
      'nft.contract': nft_contract,
    });

    /* eslint-disable no-console */
    // console.log(JSON.stringify(pipeline, null, 2));
    /* eslint-enable no-console */

    const aggregateResult = await AggregationPost({
      db: req.db,
      pipeline,
    });

    return res.json({ aggregateResult });
  })
  .get(async (req: RequestWithMiddleware, res: NextApiResponse) => {
    const params = req.url;

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
    let aggregateResult;

    try {
      aggregateResult = await Aggregation({
        db: req.db,
        pipeline,
      });
    } catch (e) {
      //console.log(e);
      return res.json({ error: e });
    }
    return res.json({ aggregateResult });
  });

module.exports = allowCors(handler);
//export default handler;

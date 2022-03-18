import { Db } from 'mongodb';

import { IAgreggateParams } from '@/types/api/aggregate';

interface IAggregationGen extends IAgreggateParams {
  db: Db;
  limit: number;
}

export async function Aggregation({
  db,
  contract_address,
  limit,
}: IAggregationGen) {
  const call = await db
    .collection('transaction')
    .aggregate([
      {
        $match: {
          tags: contract_address,
        },
      },
      {
        $group: {
          _id: {
            dayOfYear: { $dayOfYear: '$process_date' },
            minute: { $minute: '$process_date' },
          },
          total: { $sum: '$value.shifted' },
        },
      },
      { $sort: { dayOfYear: -1, minute: -1 } },
      { $limit: limit },
    ])
    .toArray();
  return call;
}

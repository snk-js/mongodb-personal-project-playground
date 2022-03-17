export async function getLineChartData(db, limit = 60) {
  const call = await db
    .collection('transaction')
    .aggregate([
      {
        $match: {
          tags: '0x7f268357a8c2552623316e2562d90e642bb538e5:atomicMatch_:1',
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

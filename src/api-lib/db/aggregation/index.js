export const Aggregation = async ({ db, pipeline }) =>
  await db.collection('transaction').aggregate(pipeline).toArray();

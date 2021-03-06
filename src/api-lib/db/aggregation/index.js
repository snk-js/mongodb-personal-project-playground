// this receive whole aggregation piple to succed
export const Aggregation = async ({ db, pipeline }) =>
  await db
    .collection('transaction')
    .aggregate([...pipeline])
    .toArray();

// this receive pipeline through API post parameters
export const AggregationPost = async ({ db, pipeline }) =>
  await db.collection('transaction').aggregate(pipeline).toArray();

export const Aggregation = async ({ db, pipeline, date }) =>
  await db
    .collection('transaction')
    .aggregate(date ? [...pipeline(new Date(...date))] : pipeline)
    .toArray();

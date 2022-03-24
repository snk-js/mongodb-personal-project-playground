import util from 'util';

export const Aggregation = async ({ db, pipeline }) => {
  // console.log(pipeline['$match']);
  // console.log(pipeline['$group']);
  // console.log(pipeline['$sort']);

  console.log(util.inspect(pipeline, false, null, true));
  return await db
    .collection('transaction')
    .aggregate([...pipeline])
    .toArray();
};

export const AggregationPost = async ({ db, pipeline, date }) =>
  await db
    .collection('transaction')
    .aggregate(date ? [...pipeline(new Date(...date))] : pipeline)
    .toArray();

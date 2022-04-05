export const genSort = (by, isAggregateExists) => ({
  $sort: {
    [isAggregateExists ? (by ? '_id' : 'total') : 'timestamp']: -1,
  },
});

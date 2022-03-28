/*
  
   * $sort stage, we'll always sort by _id for now, may change in the future
   */
export const genSort = () => ({
  $sort: {
    _id: -1,
  },
});

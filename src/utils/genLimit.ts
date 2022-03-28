/*
 * $limit stage, limit the number of results
 */
export const genLimit = (num: string) => ({
  $limit: parseInt(num),
});

/*
 * $limit stage, limit the number of results
 */
export const genLimit = (limit) => ({
  $limit: (limit && parseInt(limit)) ?? 10,
});

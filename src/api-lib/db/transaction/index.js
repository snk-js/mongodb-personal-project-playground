export const Transaction = async ({ db, pipeline }) => {
  const transactions = await db.collection('transaction');

  return transactions.find(pipeline).toArray();
};

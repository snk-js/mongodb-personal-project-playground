export const Transaction = async ({ db, config, date }) => {
  const transactions = await db.collection('transaction');

  return transactions
    .find(config(new Date(...date)))
    .sort({ timestamp: -1 })
    .toArray();
};

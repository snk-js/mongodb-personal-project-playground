export const Transaction = async ({ db, pipeline }) => {
  const transactions = await db.collection('transaction');

  return transactions.aggregate(pipeline).toArray();
};

export const TransactionById = async ({ db, id }) => {
  const transactions = await db.collection('transaction');

  return transactions.aggregate([{ $match: { _id: id } }]).toArray();
};

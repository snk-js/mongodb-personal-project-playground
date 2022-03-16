import nc from 'next-connect';

import { getLineChartData } from '@/api-lib/db/';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const lineChartData = await getLineChartData(req.db);

  console.log('hellooooooooo');
  console.log({ lineChartData });

  if (!lineChartData) {
    return res.status(404).json({ error: { message: 'Post is not found.' } });
  }

  return res.json({ lineChartData });
});

export default handler;

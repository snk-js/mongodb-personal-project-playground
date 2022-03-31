import web3 from 'web3-utils';

import { formatMongoDate } from '@/utils/dateUtils';
import { genLimit } from '@/utils/mongoDb/pipeline/genLimit';
import { genMatch } from '@/utils/mongoDb/pipeline/genMatch';
import { genSort } from '@/utils/mongoDb/pipeline/genSort';
import { getTags } from '@/utils/mongoDb/pipeline/getTags';

export const genTransactionPipe = (aggParams: Record<string, any>) => {
  const {
    contract_address,
    func,
    success,
    starting_before,
    collapse,
    num,
    date,
    contains_address,
  } = aggParams;

  if (!web3.isAddress(contract_address)) {
    throw new Error('Invalid contract address');
  }

  const { dateOperator, dateISO } = formatMongoDate(date);

  const tags = getTags(contract_address, func, success);

  const matchStage = genMatch(tags, dateOperator, dateISO);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  const pipeline = [matchStage, sortStage, limitStage];

  return [...pipeline];
};

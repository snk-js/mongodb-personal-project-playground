import web3 from 'web3-utils';

import { formatMongoDate } from './formatMongoDate';
import { genLimit } from './genLimit';
import { genMatch } from './genMatch';
import { genSort } from './genSort';
import { getTags } from './getTags';

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

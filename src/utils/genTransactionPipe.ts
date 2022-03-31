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

  let dateOperator;
  let dateLongEpoch;

  if (date) {
    dateOperator = date.split(':')[0];
    dateLongEpoch = date.split(':')[1];
  }

  const tags = getTags(contract_address, func, success);

  const matchStage = genMatch(tags, dateOperator, dateLongEpoch);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  const pipeline = [matchStage, sortStage, limitStage];

  return [...pipeline];
};

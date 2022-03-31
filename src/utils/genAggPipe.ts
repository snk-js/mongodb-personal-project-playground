import web3 from 'web3-utils';

import { formatMongoDate } from './formatMongoDate';
import { genGroup } from './genGroup';
import { genLimit } from './genLimit';
import { genMatch } from './genMatch';
import { genSort } from './genSort';
import { getTags } from './getTags';

export const genAggPipe = (aggParams: Record<string, any>) => {
  const {
    contract_address,
    func,
    success,
    field,
    operation,
    group_by,
    num,
    date,
  } = aggParams;

  const nft_contract = aggParams['nft.contract'];
  const nft_event = aggParams['nft.event'];

  if (!web3.isAddress(contract_address)) {
    throw new Error('Invalid contract address');
  }

  const { dateOperator, dateISO } = formatMongoDate(date);

  const tags = getTags(
    contract_address,
    func,
    success,
    nft_contract,
    nft_event
  );

  const matchStage = genMatch(tags, dateOperator, dateISO);

  const groupStage = genGroup(operation, field, group_by);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  return [matchStage, groupStage, sortStage, limitStage];
};

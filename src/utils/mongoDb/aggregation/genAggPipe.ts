import web3 from 'web3-utils';

import { genGroup } from '../pipeline/genGroup';
import { genLimit } from '../pipeline/genLimit';
import { genMatch } from '../pipeline/genMatch';
import { genSort } from '../pipeline/genSort';
import { getTags } from '../pipeline/getTags';
import { formatMongoDate } from '../../dateUtils/index';

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

  const allowedSuccess = ['1', '0', 1, 0];
  const allowedOperation = ['max', 'min', 'avg', 'sum'];
  const allowedNftEvent = ['sale'];

  if (nft_event && allowedNftEvent.includes(nft_event)) {
    throw new Error('Invalid nft event');
  }

  if (nft_contract && !web3.isAddress(nft_contract)) {
    throw new Error('Invalid contract address');
  }

  if (operation && !allowedOperation.includes(operation))
    throw new Error('Invalid operation');

  if (success && !allowedSuccess.includes(success))
    throw new Error('Invalid success value');

  if (contract_address && !web3.isAddress(contract_address)) {
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

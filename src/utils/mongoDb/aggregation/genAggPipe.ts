import { validateAggParams } from './validateAggParams';
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
    coin_buy,
    coin_sell,
  } = aggParams;

  const nft_contract = aggParams['nft.contract'];
  const nft_event = aggParams['nft.event'];
  const { dateOperator, dateISO } = formatMongoDate(date);

  let errorObj = {};

  const errors = Object.keys(errorObj);

  try {
    errorObj = validateAggParams({
      contract_address,
      group_by,
      nft_contract,
      nft_event,
      num,
      operation,
      success,
    });
  } catch (e: any) {
    throw new Error(e);
  }

  const tags = getTags(
    contract_address,
    func,
    success,
    nft_contract,
    nft_event,
    coin_buy,
    coin_sell
  );

  const matchStage = genMatch(tags, dateOperator, dateISO);

  const groupStage = genGroup(operation, field, group_by);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  // IF errors.length > 0, then we have an error
  return [matchStage, groupStage, sortStage, limitStage];
};

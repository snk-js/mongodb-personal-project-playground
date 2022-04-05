import { validateTransactionParams } from './validateAggParams';
import { genGroup } from '../pipeline/genGroup';
import { genLimit } from '../pipeline/genLimit';
import { genMatch } from '../pipeline/genMatch';
import { genSort } from '../pipeline/genSort';
import { getProject } from '../pipeline/getProject';
import { getTags } from '../pipeline/getTags';
import { formatMongoDate } from '../../dateUtils/index';

export const genPipe = (params: Record<string, any>) => {
  const { filter, aggregate, limit, fields } = params;

  const {
    ct_addr,
    ct_func,
    tx_success,
    tx_timestamp,
    nft,
    nft_event,
    coin_buy,
    coin_sale,
    coin_tx,
  } = filter;

  let field = '';
  let op = '';
  let by = '';

  if (aggregate) {
    field = aggregate.field;
    op = aggregate.op;
    by = aggregate.by;
  }

  const { dateOperator, dateISO } = formatMongoDate(tx_timestamp);

  let errorObj = {};

  const errors = Object.keys(errorObj);

  try {
    errorObj = validateTransactionParams({
      ct_addr,
      by,
      nft,
      nft_event,
      op,
      tx_success,
      fields,
      limit,
      coin_buy,
      coin_sale,
      coin_tx,
    });
  } catch (e: any) {
    throw new Error(e);
  }

  const tags = getTags(
    ct_addr,
    ct_func,
    tx_success,
    nft,
    nft_event,
    coin_buy,
    coin_sale,
    coin_tx
  );

  const matchStage = genMatch(tags, dateOperator, dateISO);

  const groupStage = genGroup(op, field, by);

  const sortStage = genSort(by, aggregate && aggregate);

  const limitStage = genLimit(limit);

  const mountStages = [matchStage, groupStage, sortStage, limitStage];

  if (fields) {
    mountStages.push(getProject(fields));
  } // IF errors.length > 0, then we have an error
  return mountStages;
};

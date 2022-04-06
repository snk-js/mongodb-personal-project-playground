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

  const ct_addr = filter?.ct_addr;
  const ct_func = filter?.ct_func;
  const tx_success = filter?.tx_success;
  const tx_timestamp = filter?.tx_timestamp;
  const nft = filter?.nft;
  const nft_event = filter?.nft_event;
  const coin_buy = filter?.coin_buy;
  const coin_sale = filter?.coin_sale;
  const coin_tx = filter?.coin_tx;

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

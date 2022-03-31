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

  //console.log("nft_contract: " + nft_contract);
  //console.log("nft_event: " + nft_event);

  let dateOperator = null;
  let dateLongEpoch = null;

  if (date) {
    dateOperator = date.split(':')[0];
    dateLongEpoch = date.split(':')[1];
  }

  const tags = getTags(
    contract_address,
    func,
    success,
    nft_contract,
    nft_event
  );

  const matchStage = genMatch(tags, dateOperator, dateLongEpoch);

  const groupStage = genGroup(operation, field, group_by);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  return [matchStage, groupStage, sortStage, limitStage];
};

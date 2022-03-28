import { genLimit } from './genLimit';
import { genMatch } from './genMatch';
import { genSort } from './genSort';
import { getTags } from './getTags';

export const genAggPipe = (aggParams: Record<string, any>) => {
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

  const dateOperator = date.split(':')[0];
  const dateLongEpoch = date.split(':')[0];

  const nft_contract = aggParams['nft.contract'];
  const nft_event = aggParams['nft.event'];

  const tags = getTags(
    contract_address,
    func,
    success,
    nft_contract,
    nft_event
  );

  const matchStage = genMatch(tags, dateOperator, dateLongEpoch);

  const sortStage = genSort();

  const limitStage = genLimit(num);

  return [matchStage, sortStage, limitStage];
};

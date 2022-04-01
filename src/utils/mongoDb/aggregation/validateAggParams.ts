import web3 from 'web3-utils';

export const validateAggParams = ({
  group_by,
  nft_event,
  nft_contract,
  num,
  operation,
  success,
  contract_address,
}) => {
  const errors = {};

  const allowedSuccess = ['1', '0', 1, 0];
  const allowedOperation = ['max', 'min', 'avg', 'sum'];
  const allowedNftEvent = ['sale'];
  const allowedGroupBy = ['day', 'hour', 'minute'];

  const allowedNum = {
    day: 7,
    hour: 24,
    minute: 60,
  };

  if (group_by && !allowedGroupBy.includes(group_by)) {
    errors[group_by] =
      'group_by must be one of the following: day, hour, minute';
    throw new Error('Invalid group_by');
  } else if (num > allowedNum[group_by]) {
    errors[num] = `num must be less than ${allowedNum[group_by]}`;
    throw new Error(
      `the num chosen with groupBy parameter ${group_by} must be less than ${allowedNum[group_by]}`
    );
  }

  if (nft_event && !allowedNftEvent.includes(nft_event)) {
    errors[nft_event] = 'nft_event must be one of the following: sale';
    throw new Error('Invalid nft event');
  }

  if (nft_contract && !web3.isAddress(nft_contract)) {
    errors[nft_contract] = 'nft_contract must be a valid address';
    throw new Error('Invalid contract address');
  }

  if (operation && !allowedOperation.includes(operation)) {
    errors[operation] =
      'operation must be one of the following: max, min, avg, sum';
    throw new Error('Invalid operation');
  }
  if (success && !allowedSuccess.includes(success)) {
    errors[success] = 'success must be one of the following: 1, 0, true, false';
    throw new Error('Invalid success value');
  }
  if (contract_address && !web3.isAddress(contract_address)) {
    errors[contract_address] = 'contract_address must be a valid address';
    throw new Error('Invalid contract address');
  }

  return errors;
};

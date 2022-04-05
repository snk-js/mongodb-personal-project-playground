import { validateEthAddr } from '@/utils/eth/validateAddr';

import { TxObjProperties } from '@/types/eth';

export const validateTransactionParams = ({
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
}) => {
  const errors = {};

  const addrs = {
    coin_buy,
    coin_sale,
    coin_tx,
    ct_addr,
    nft,
  };

  const allowedSuccess = ['1', '0', 1, 0];
  const allowedOperation = ['max', 'min', 'avg', 'sum'];
  const allowedNftEvent = ['sale'];
  const allowedGroupBy = ['day', 'hour', 'minute'];
  const allowedFieldsValues = ['1', '0', 1, 0];
  const allowedFieldsProperties = [...TxObjProperties];

  // const allowedNum = {
  //   day: 7,
  //   hour: 24,
  //   minute: 60,
  // };

  if (limit && limit > 100) {
    throw new Error('limit must be less than 100');
  }

  const fieldsEntries: Array<Array<any>> = fields ? Object.entries(fields) : [];

  if (fieldsEntries && fieldsEntries.length > 0) {
    fieldsEntries.map((entrie) => {
      if (
        !allowedFieldsProperties.includes(entrie[0]) ||
        !allowedFieldsValues.includes(entrie[1])
      ) {
        errors['fieldsEntry'] = 'Invalid field value:' + entrie.toString();
      }
    });
  }

  if (by && !allowedGroupBy.includes(by)) {
    errors['by'] = 'group_by must be one of the following: day, hour, minute';
    throw new Error('Invalid group_by');
  }
  if (nft_event && !allowedNftEvent.includes(nft_event)) {
    errors['nft_event'] = 'nft_event must be one of the following: sale';
    throw new Error('Invalid nft event');
  }

  if (op && !allowedOperation.includes(op)) {
    errors['op'] = 'operation must be one of the following: max, min, avg, sum';
    throw new Error('Invalid operation');
  }
  if (tx_success && !allowedSuccess.includes(tx_success)) {
    errors['tx_success'] =
      'success must be one of the following: 1, 0, true, false';
    throw new Error('Invalid success value');
  }

  // validate addresses
  validateEthAddr(addrs, errors);

  return errors;
};

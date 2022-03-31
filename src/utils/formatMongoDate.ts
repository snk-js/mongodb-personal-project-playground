import { validateDateFormat } from './dateUtils';
import { comparisons } from './mongoDbOperators/query';

export const formatMongoDate = (date: string) => {
  let dateOperator = '';
  let dateISO = '';

  if (date) {
    if (date.includes(':')) {
      dateOperator = date.split(':')[0];
      dateISO = date.split(':')[1];
    } else {
      throw Error('please use format: "<comparison operator>:dateISO"');
    }
  } else {
    throw Error('Date is not valid or not exist');
  }

  const defaultDate = new Date().toISOString().split('T')[0];

  validateDateFormat(dateISO) && comparisons.includes(dateOperator)
    ? { dateOperator, dateISO }
    : { dateOperator: 'gte', dateLongEpoch: defaultDate };

  return { dateOperator, dateISO };
};

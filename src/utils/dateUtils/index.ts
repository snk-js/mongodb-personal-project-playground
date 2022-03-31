import { allowedComparisons } from '@/utils/mongoDb/mongoDbOperators/query';

export const validateDateFormat = function (input) {
  // YYYY-MM-DD
  const reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return input.match(reg);
};
export const formatMongoDate = (date: string) => {
  let dateOperator = '';
  let dateISO = '';

  if (date) {
    if (date.includes(':')) {
      dateOperator = date.split(':')[0];
      dateISO = date.split(':')[1];
    } /* else {
      throw Error('please use format: "<comparison operator>:dateISO"');
    } */
  } /* else {
    throw Error('Date is not valid or not exist');
  } */

  const defaultDate = new Date().toISOString().split('T')[0];

  validateDateFormat(dateISO) && allowedComparisons.includes(dateOperator)
    ? { dateOperator, dateISO }
    : { dateOperator: 'gte', dateLongEpoch: defaultDate };

  return { dateOperator, dateISO };
};

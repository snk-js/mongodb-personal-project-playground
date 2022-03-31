export const validateDateFormat = function (input) {
  const reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return input.match(reg);
};

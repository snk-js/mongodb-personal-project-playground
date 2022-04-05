export const genMatch = (
  tagsArr: string[],
  dateOperator?: string | null,
  dateISO?: string | null
) => {
  const match: any = {
    $match: {
      tags: {
        $all: tagsArr,
      },
    },
  };

  dateOperator && dateISO
    ? (match['$match']['timestamp'] = {
        // @ts-ignore
        ['$' + `${dateOperator}`]: new Date(dateISO),
      })
    : (match['$match']['timestamp'] = -1);

  return match;
};

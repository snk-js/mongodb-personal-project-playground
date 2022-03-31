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

  if (dateOperator && dateISO) {
    match['$match']['timestamp'] = {
      // @ts-ignore
      ['$' + `${dateOperator}`]: new Date(dateISO),
    };
  }

  return match;
};

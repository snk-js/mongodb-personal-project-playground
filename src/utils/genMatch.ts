export const genMatch = (
  tagsArr: string[],
  dateOperator: string,
  dateLongEpoch: string
) => {
  const match: any = {
    $match: {
      tags: {
        $all: tagsArr,
      },
    },
  };

  if (dateOperator && dateLongEpoch) {
    match['$match']['timestamp'] = {
      // @ts-ignore
      ['$' + `${dateOperator}`]: new Date(dateLongEpoch),
    };
  }

  return match;
};

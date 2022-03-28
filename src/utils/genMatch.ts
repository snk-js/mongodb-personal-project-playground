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
    match['timestamp'] = {
      // @ts-ignore
      ['$' + `${dateOperator}`]: dateLongEpoch,
    };
  }

  return match;
};

export const genGroup = (op: string, field: string, by: string) => {
  const group_stage = { $group: {} } as any;

  let _id: any = 1;

  const minute = {
    minute: {
      $minute: '$timestamp',
    },
  };

  const hour = {
    hour: {
      $hour: '$timestamp',
    },
  };

  const day = {
    day: {
      $dayOfMonth: '$timestamp',
    },
  };

  const month = {
    month: {
      $month: '$timestamp',
    },
  };

  const year = {
    year: {
      $year: '$timestamp',
    },
  };

  const timestamp = {
    day,
    month,
    year,
  };

  if (by === 'minute') {
    timestamp['minute'] = minute;
    timestamp['hour'] = hour;
  }

  if (by === 'hour') {
    timestamp['hour'] = hour;
  }

  _id = timestamp;

  group_stage['$group']._id = _id;
  group_stage['$group'].total = {} as any;
  group_stage['$group'].total['$' + op] = '$' + field; // use dollar sign to query fields in document by json path

  return group_stage;
};

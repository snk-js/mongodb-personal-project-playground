export const genGroup = (op: string, field: string, by: string) => {
  const group_stage = { $group: {} } as any;
  if ((op === 'max' || op === 'min' || op === 'avg' || op === 'sum') && field) {
    // Mongo uses the _id field for grouping data in aggregations
    let _id = {} as any;

    // Group by minute
    if (by === 'minute') {
      _id = {
        year: {
          $year: '$timestamp',
        },
        month: {
          $month: '$timestamp',
        },
        day: {
          $dayOfMonth: '$timestamp',
        },
        hour: {
          $hour: '$timestamp',
        },
        minute: {
          $minute: '$timestamp',
        },
      };
    }
    // Group by hour
    else if (by === 'hour') {
      _id = {
        year: {
          $year: '$timestamp',
        },
        month: {
          $month: '$timestamp',
        },
        day: {
          $dayOfMonth: '$timestamp',
        },
        hour: {
          $hour: '$timestamp',
        },
      };
    }
    // Group by day
    else if (by === 'day') {
      _id = {
        year: {
          $year: '$timestamp',
        },
        month: {
          $month: '$timestamp',
        },
        day: {
          $dayOfMonth: '$timestamp',
        },
      };
    }
    // No grouping passed in! Get the max/min/avg/sum
    else {
      _id = 1; // group on "1" means group everything together, since 1 will be the same everywhere
    }

    group_stage['$group']._id = _id;
    group_stage['$group'].total = {} as any;
    group_stage['$group'].total['$' + op] = '$' + field; // use dollar sign to query fields in document by json path
  }

  return group_stage;
};

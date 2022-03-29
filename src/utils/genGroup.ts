export const genGroup = (
  operation: string,
  field: string,
  group_by: string
) => {
  const group_stage = { $group: {} } as any;
  if (
    (operation === 'max' ||
      operation === 'min' ||
      operation === 'avg' ||
      operation === 'sum') &&
    field
  ) {
    // Mongo uses the _id field for grouping data in aggregations
    let _id = {} as any;

    // Group by minute
    if (group_by === 'minute') {
      _id = {
        day: {
          $dayOfYear: '$timestamp',
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
    else if (group_by === 'hour') {
      _id = {
        day: {
          $dayOfYear: '$process_date',
        },
        hour: {
          $hour: '$timestamp',
        },
      };
    }
    // Group by day
    else if (group_by === 'day') {
      _id = {
        day: {
          $dayOfYear: '$timestamp',
        },
      };
    }
    // No grouping passed in! Get the max/min/avg/sum
    else {
      _id = 1; // group on "1" means group everything together, since 1 will be the same everywhere
    }

    group_stage['$group']._id = _id;
    group_stage['$group'].total = {} as any;
    group_stage['$group'].total['$' + operation] = '$' + field; // use dollar sign to query fields in document by json path
  }

  return group_stage;
};

export const genAggPipe = (aggParams: Record<string, any>) => {
  const {
    contract_address,
    func,
    success,
    field,
    operation,
    group_by,
    num,
    date,
  } = aggParams;

  const nft_contract = aggParams['nft.contract'];
  const nft_event = aggParams['nft.event'];

  const tags_arr = [] as any;

  // contract address passed in
  if (contract_address && func) {
    // tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    tags_arr.push(contract_address.toLowerCase() + ':' + func + ':' + success);
  } else if (contract_address) {
    // tags have the form <CONTRACT ADRESS>:contract
    tags_arr.push(contract_address.toLowerCase() + ':contract');
  }

  // nft special filters passed in
  if (nft_contract) {
    // nft tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    tags_arr.push(nft_contract.toLowerCase() + ':nft.contract');
  }

  if (nft_event) {
    // nft tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    tags_arr.push(nft_event.toLowerCase() + ':nft.event');
  }

  const genMatch = (tags: string[], dateParam: number[]) => {
    const match: any = {
      $match: {
        tags: {
          $all: tags,
        },
      },
    };

    if (date) {
      match['timestamp'] = {
        // @ts-ignore
        $gt: new Date(...dateParam),
      };
    }

    return match;
  };

  const match_stage = genMatch(tags_arr, date);

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
          $dayOfYear: '$process_date',
        },
        hour: {
          $hour: '$process_date',
        },
        minute: {
          $minute: '$process_date',
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
          $hour: '$process_date',
        },
      };
    }
    // Group by day
    else if (group_by === 'day') {
      _id = {
        day: {
          $dayOfYear: '$process_date',
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

  /*
   * $sort stage, we'll always sort by _id for now, may change in the future
   */
  const sort_stage = {
    $sort: {
      _id: -1,
    },
  };

  /*
   * $limit stage, limit the number of results
   */
  const limit_stage = {
    $limit: parseInt(num),
  };

  // Assemble the complete aggregation pipeline!
  const agg_stages = [] as any;
  agg_stages.push(match_stage); // add $match stage
  agg_stages.push(group_stage); // add $group stage
  agg_stages.push(sort_stage); // add $sort stage
  agg_stages.push(limit_stage); // add $limit stage

  return agg_stages;
};

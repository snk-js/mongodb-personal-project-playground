export type IAgreggateParams = {
  contract_address?: string;
  //Filter by a specific function name. Requires a contract address
  func?: string;
  success: number;
  field: string;
  operation: string;
  group_by: string;
  num: number;
};

export type ITransactionParams = {
  contract_address?: string;
  func?: string;
  success?: number;
  starting_before?: number;
  num?: number;
  collapse?: boolean;
  contains_address?: string;
};

// export type Pipeline = {
//   $group?: {
//     _id: MongoDBExpression

//     <field1>: { <accumulator1> : <expression1> },
//     ...
//   }
// }

export enum Stages {
  '$geoNear',
  '$addFields',
  '$bucket',
  '$graphLookup',
  '$documents',
  '$limit',
  '$densify',
  '$bucketAuto',
  '$lookup',
  '$merge',
  '$match',
  '$project',
  '$count',
  '$unionWith',
  '$out',
  '$sample',
  '$redact',
  '$facet',
  '$skip',
  '$replaceRoot',
  '$group',
  '$sort',
  '$replaceWith',
  '$sortByCount',
}

// WHERE - $match
// GROUP BY - $group
// HAVING - $match
// SELECT - $project
// ORDER BY - $sort
// LIMIT - $limit
// SUM() - $sum
// COUNT() - $sum $sortByCount
// join - $lookup
// SELECT INTO NEW_TABLE - $out
// MERGE INTO TABLE - $merge (Available starting in MongoDB 4.2)
// UNION ALL - $unionWith (Available starting in MongoDB 4.4)

// $accumulator;

// $addToSet;

// $avg;
// $count;

// $first;

// $last;

// $max;

// $mergeObjects;

// $min;

// $push;

// $stdDevPop;

// $stdDevSamp;

// $sum;

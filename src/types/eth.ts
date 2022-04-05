export type ITx = {
  _id: string;
  hash: string;
  nonce: string;
  block_hash: string;
  block_number: string;
  transaction_index: string;
  chain_id: string;
  v: string;
  r: string;
  s: string;
  timestamp: string;
  process_date: string;
  type: string;
  gas: ITxGas;
  gas_price: ITxGas;
  max_fee_per_gas: ITxGas;
  max_priority_fee_per_gas: ITxGas;
  value: ITxValue;
  to: ITxExchange;
  from: ITxExchange;
  function: ITxFunction;
  logs: ITxLogs;
  tags: ITxTags;
  nft: ITxNft;
  transfers_by_token_id: Array<ITxTransferByTokenArrayObj>;
};

// "0x7f268357a8c2552623316e2562d90e642bb538e5:contract"
// "0x7f268357a8c2552623316e2562d90e642bb538e5:atomicMatch_:1"
// "0xDA2686fd32C6b74d55605CfB48bef331771e7Fc6:transfer"
// "0xDA2686fd32C6b74d55605CfB48bef331771e7Fc6:881:transfer"
type ITxTags = Array<string>;

type ITxTransferByTokenArrayObj = {
  function_address: ITxTokenTransfer;
  from: string;
  to: string;
  token_id: string;
};

type ITxNft = {
  token_contract: string;
  value_eth: number;
  name: string;
  action: string;
  token_index: string;
};

type ITxLogs = {
  functions: Array<ITxLogFunc>;
  num_logs: number;
  status: 1 | 0;
};

type ITxLogFunc = {
  //"Approval"
  name: string;
  // event
  type: string;
  params: Array<ITxTokenTransfer>;
  function_address: Array<ITxTokenTransfer>;
};

type ITxTokenTransfer = {
  value: string;
  name: string;
  symbol?: string;
  type?: string;
};

type ITxGas = {
  hex: string;
  wei: ITxWei;
  eth: string | number;
};

type ITxWei = {
  s: number;
  e: number;
  c: Array<number>;
  _isBigNumber: boolean;
};

type ITxValue = {
  hex: string;
  raw: ITxGas;
  shifted: number;
};

type ITxExchange = {
  address: string;
  name: string;
  symbol: any;
};

type ITxFunction = {
  name: string;
  params: Array<ITxFunctionParamObj>;
};

type ITxFunctionParamObj = {
  // addrs
  name: string;
  value: Array<ITxFunctionParamAddrs>;
  //"address[14]"
  type: string;
};

type ITxFunctionParamAddrs = {
  raw: string;
  name: string;
  symbol: string;
};

export const TxObjProperties = [
  '_id',
  'hash',
  'nonce',
  'block_hash',
  'block_number',
  'transaction_index',
  'chain_id',
  'v',
  'r',
  's',
  'timestamp',
  'process_date',
  'type',
  'gas',
  'gas_price',
  'max_fee_per_gas',
  'max_priority_fee_per_gas',
  'value',
  'to',
  'from',
  'function',
  'logs',
  'tags',
  'nft',
  'transfers_by_token_id',
];

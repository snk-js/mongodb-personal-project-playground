import axios from 'axios';

describe('MongoDB API payload requests for Aggregation', () => {
  it('should retrieve a transaction by hash', async () => {
    const result = await axios.get(
      'http://localhost:3000/api/v0/transaction/0xb2a124afd6779cbe7ed659ce14383374f32163e6b94e6171e463e89100be9a65'
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
  });

  it('retrieve Latest transactions for a contract address: Latest Bored Ape Yacht Club Activity', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          // update on docs
          ct_addrs: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        },
        limit: 10,
      }
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
  });

  it('retrieve Latest transactions for a contract address and function: Uniswap "swapExactTokensForTokens" function call', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          ct_addrs: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          ct_func: 'swapExactTokensForTokens',
          tx_success: 1,
        },
        limit: 10,
      }
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
  });

  it('retrieve the Latest transactions for an NFT contract:** CryptoPunks v1 (across multiple exchanges)', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          nft_event: 'sale',
          nft: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
        },
        limit: 10,
      }
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
  });

  it('retrieve Hourly sum of OHM coin sales on SuhsiSwap over past 24 hours', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          ct_addrs: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
          coin_sale: '0x0ab87046fBb341D058F17CBC4c1133F25a20a52f',
          tx_timestamp: 'gte:2022-03-29',
        },

        aggregate: {
          op: 'sum',
          by: 'hour',
          field: 'coin_transaction.from.amount_shifted',
          limit: 24,
        },

        // Parameter explanations:
        // filter.address: Contract address of exchange (optional)
        // filter.coin_sale: Contract address of coin that was sold
        // filter.timestamp: Greater than or equal to 2022-03-22 (time may also be included)
        // aggregate.op: Sum all elements within each time range bucket
        // aggregate.by: Group by hourly sales
        // aggregate.field: Complete path to the amount to sum (it can be helpful to get a sample transaction document to find this path)
        // aggregate.limit: Number of results
      }
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
  });

  it('retrieve Hourly transaction volume for LooksRare NFT exchange', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          ct_addrs: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
          timestamp: 'gte:2022-03-29',
        },
        aggregate: {
          op: 'sum',
          by: 'hour',
          field: 'value.shifted',
          limit: 24,
        },

        // Parameter explanations:
        // filter.address: Contract address of LooksRare
        // filter.timestamp: Greater than or equal to 2022-03-22 (time may also be included)
        // aggregate.op: Sum all elements within each time range bucket
        // aggregate.by: Group by hourly sales
        // aggregate.field: Shifted value (let's use ETH)
        // aggregate.limit: Number of results
      }
    );

    const { data } = result;
    expect(data).toStrictEqual(CryptoPunksSalesOver1day);
  });

  it('Get Average price of CryptoPunks v1 sales over past 24 hours', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        aggregate: {
          op: 'avg',
          by: 'day',
          field: 'value.shifted',
        },
        filter: {
          nft_event: 'sale',
          nft: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
          timestamp: 'lte:2022-03-31',
          limit: 1,
        },
      }
    );

    const { data } = result;
    expect(data).toStrictEqual(CryptoPunksSalesOver1day);
  });

  it('sample call 1', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        filter: {
          nft_event: 'sale',
          nft: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
        },
        aggregate: {
          op: 'sum',
          by: 'minute',
          field: 'value.eth',
          limit: 60,
        },
      }
    );

    const { data } = result;
    expect(data);
  });

  it('get the last 10 transactions', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        limit: 10,
      }
    );

    const { data } = result;
    expect(data);
  });
});

const CryptoPunksSalesOver1day = [
  { _id: { year: 2022, month: 3, day: 28 }, total: 8.42 },
];

const CryptoPunksSalesOver7days = [
  {
    _id: {
      day: 28,
      month: 3,
      year: 2022,
    },
    total: 42.1,
  },
  {
    _id: {
      day: 27,
      month: 3,
      year: 2022,
    },
    total: 0,
  },
  {
    _id: {
      day: 26,
      month: 3,
      year: 2022,
    },
    total: 0,
  },
  {
    _id: {
      day: 25,
      month: 3,
      year: 2022,
    },
    total: 13.6,
  },
  {
    _id: {
      day: 24,
      month: 3,
      year: 2022,
    },
    total: 95.77,
  },
  {
    _id: {
      day: 23,
      month: 3,
      year: 2022,
    },
    total: 38.5,
  },
  {
    _id: {
      day: 21,
      month: 3,
      year: 2022,
    },
    total: 16.2,
  },
];

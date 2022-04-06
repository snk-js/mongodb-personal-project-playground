import axios from 'axios';

describe('MongoDB API payload requests for Aggregation', () => {
  it('get chart data of latest CryptoPunks v1 sales over past 7 days', async () => {
    const result = await axios.post(
      'http://localhost:3000/api/v0/transaction',
      {
        aggregate: {
          op: 'sum',
          by: 'day',
          field: 'value.shifted',
        },
        filter: {
          nft_event: 'sale',
          nft: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
          tx_timestamp: 'lte:2022-03-31',
        },
        limit: 7,
      }
    );

    const { data } = result;

    data.length && expect(data[0]['_id']).toBeTruthy();
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
        },
        limit: 1,
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

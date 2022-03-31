import axios from 'axios';

describe('MongoDB API payload requests for Aggregation', () => {
  it('get chart data of latest CryptoPunks v1 sales over past 7 days', async () => {
    const chartData = await axios.post(
      'http://localhost:3000/api/v0/aggregate',
      {
        nft_event: 'sale',
        nft_contract: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
        date: 'lte:2022-03-31',
        operation: 'sum',
        group_by: 'day',
        field: 'value.shifted',
        num: 7,
      }
    );

    const result = chartData.data.aggregateResult;

    expect(result).toStrictEqual(CryptoPunksSalesOver7days);
  });

  it('Get Average price of CryptoPunks v1 sales over past 24 hours', async () => {
    const chartData = await axios.post(
      'http://localhost:3000/api/v0/aggregate',
      {
        nft_event: 'sale',
        nft_contract: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
        date: 'lte:2022-03-31',
        operation: 'avg',
        group_by: 'day',
        field: 'value.shifted',
        num: 1,
      }
    );

    const result = chartData.data.aggregateResult;

    expect(result).toStrictEqual(CryptoPunksSalesOver1day);
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

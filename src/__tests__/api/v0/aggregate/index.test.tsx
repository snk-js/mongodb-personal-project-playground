import axios from 'axios';

describe('MongoDB API payload requests', () => {
  it('get chart data of latest CryptoPunks v1 sales over past 7 days', async () => {
    const chartData = await axios.post(
      'http://localhost:3000/api/v0/aggregate',
      {
        nft_event: 'sale',
        nft_contract: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
        date: 'gte:2022-03-21',
        operation: 'sum',
        group_by: 'day',
        field: 'value.shifted',
        num: 7,
      }
    );

    expect(chartData).toBe({});
  });
});

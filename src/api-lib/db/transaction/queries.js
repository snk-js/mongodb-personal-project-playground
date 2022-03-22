export const dashboard_queries = {
  bubbleAllSales: (date) => ({
    tags: {
      $all: [
        'sale:nft.event',
        '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
      ],
    },
    timestamp: {
      $gt: date,
    },
  }),
};

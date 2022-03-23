export const dashboard_aggregation_pipelines = {
  highPrice: (date) => [
    {
      $match: {
        tags: {
          $all: [
            'sale:nft.event',
            '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
          ],
        },
        timestamp: {
          $gt: date,
        },
      },
    },
    {
      $group: {
        _id: 'max',
        maxQuantity: {
          $max: '$value.shifted',
        },
      },
    },
  ],
  lowPrice: (date) => [
    {
      $match: {
        tags: {
          $all: [
            'sale:nft.event',
            '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
          ],
        },
        timestamp: {
          $gt: date,
        },
      },
    },
    {
      $group: {
        _id: 'min',
        maxQuantity: {
          $min: '$value.shifted',
        },
      },
    },
  ],
  avgPrice: (date) => [
    {
      $match: {
        tags: {
          $all: [
            'sale:nft.event',
            '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
          ],
        },
        timestamp: {
          $gt: date,
        },
      },
    },
    {
      $group: {
        _id: 'avg',
        maxQuantity: {
          $avg: '$value.shifted',
        },
      },
    },
  ],

  lineAvgPriceOverTime: [
    {
      $match: {
        tags: {
          $all: [
            'sale:nft.event',
            '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          day: {
            $dayOfYear: '$process_date',
          },
          hour: {
            $hour: '$process_date',
          },
          minute: {
            $minute: '$process_date',
          },
        },
        total: {
          $avg: '$value.shifted',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $limit: 30,
    },
  ],
  lineVolumeOvertime: [
    {
      $match: {
        tags: {
          $all: [
            'sale:nft.event',
            '0x9401518f4ebba857baa879d9f76e1cc8b31ed197:nft.contract',
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          day: {
            $dayOfYear: '$process_date',
          },
          hour: {
            $hour: '$process_date',
          },
          minute: {
            $minute: '$process_date',
          },
        },
        total: {
          $sum: '$value.shifted',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $limit: 30,
    },
  ],
};

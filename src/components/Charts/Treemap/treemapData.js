export const treemapData = [
  {
    $match: {
      'receipt.logs_0.function_address.value':
        '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      timestamp: { $gte: new Date('2021-11-20T12:05:45') },
    },
  },
  {
    $group: {
      _id: {
        dayOfYear: {
          $dayOfYear: '$timestamp',
        },
        hour: {
          $hour: '$timestamp',
        },
      },
      total: {
        $avg: '$value.value_shift18',
      },
    },
  },
  {
    $sort: {
      dayOfYear: -1,
      hour: -1,
    },
  },
  {
    $limit: 24,
  },
];

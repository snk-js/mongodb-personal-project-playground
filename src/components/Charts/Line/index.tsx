import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';

const Line = ({ data /* see data tab */ }) => {
  const [chart, setChart] = useState([
    {
      _id: { dayOfYear: 75, minute: 12 },
      total: 15010,
    },
    {
      _id: { dayOfYear: 75, minute: 1256 },
      total: 123,
    },
    {
      _id: { dayOfYear: 75, minute: 115 },
      total: 251,
    },
    {
      _id: { dayOfYear: 75, minute: 12515 },
      total: 1566,
    },
    {
      _id: { dayOfYear: 75, minute: 125 },
      total: 1351,
    },
  ]);

  useEffect(() => {
    if (data && data.lineChartData) {
      console.log({ data });
      setChart(data.lineChartData);
    }
  }, [data]);

  return (
    <ResponsiveLine
      data={[
        {
          id: 'japan',
          color: 'hsl(35, 70%, 50%)',
          data:
            (chart.length &&
              chart.map((d) => {
                return { y: d.total, x: d._id.minute };
              })) ??
            chart,
        },
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=' >-.2f'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Line;

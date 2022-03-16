import { ResponsiveLine } from '@nivo/line';

const Line = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    onClick={() => console.log(data)}
    data={[
      {
        id: 'japan',
        color: 'hsl(35, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 141,
          },
          {
            x: 'helicopter',
            y: 37,
          },
          {
            x: 'boat',
            y: 79,
          },
          {
            x: 'train',
            y: 78,
          },
          {
            x: 'subway',
            y: 281,
          },
          {
            x: 'bus',
            y: 297,
          },
          {
            x: 'car',
            y: 15,
          },
          {
            x: 'moto',
            y: 242,
          },
          {
            x: 'bicycle',
            y: 208,
          },
          {
            x: 'horse',
            y: 221,
          },
          {
            x: 'skateboard',
            y: 89,
          },
          {
            x: 'others',
            y: 255,
          },
        ],
      },
      {
        id: 'france',
        color: 'hsl(89, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 189,
          },
          {
            x: 'helicopter',
            y: 192,
          },
          {
            x: 'boat',
            y: 163,
          },
          {
            x: 'train',
            y: 188,
          },
          {
            x: 'subway',
            y: 278,
          },
          {
            x: 'bus',
            y: 135,
          },
          {
            x: 'car',
            y: 204,
          },
          {
            x: 'moto',
            y: 299,
          },
          {
            x: 'bicycle',
            y: 154,
          },
          {
            x: 'horse',
            y: 114,
          },
          {
            x: 'skateboard',
            y: 289,
          },
          {
            x: 'others',
            y: 83,
          },
        ],
      },
      {
        id: 'us',
        color: 'hsl(117, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 10,
          },
          {
            x: 'helicopter',
            y: 245,
          },
          {
            x: 'boat',
            y: 2,
          },
          {
            x: 'train',
            y: 127,
          },
          {
            x: 'subway',
            y: 82,
          },
          {
            x: 'bus',
            y: 16,
          },
          {
            x: 'car',
            y: 238,
          },
          {
            x: 'moto',
            y: 3,
          },
          {
            x: 'bicycle',
            y: 209,
          },
          {
            x: 'horse',
            y: 238,
          },
          {
            x: 'skateboard',
            y: 64,
          },
          {
            x: 'others',
            y: 274,
          },
        ],
      },
      {
        id: 'germany',
        color: 'hsl(73, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 280,
          },
          {
            x: 'helicopter',
            y: 179,
          },
          {
            x: 'boat',
            y: 197,
          },
          {
            x: 'train',
            y: 293,
          },
          {
            x: 'subway',
            y: 57,
          },
          {
            x: 'bus',
            y: 217,
          },
          {
            x: 'car',
            y: 212,
          },
          {
            x: 'moto',
            y: 223,
          },
          {
            x: 'bicycle',
            y: 257,
          },
          {
            x: 'horse',
            y: 67,
          },
          {
            x: 'skateboard',
            y: 126,
          },
          {
            x: 'others',
            y: 179,
          },
        ],
      },
      {
        id: 'norway',
        color: 'hsl(187, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 125,
          },
          {
            x: 'helicopter',
            y: 239,
          },
          {
            x: 'boat',
            y: 89,
          },
          {
            x: 'train',
            y: 14,
          },
          {
            x: 'subway',
            y: 179,
          },
          {
            x: 'bus',
            y: 25,
          },
          {
            x: 'car',
            y: 73,
          },
          {
            x: 'moto',
            y: 145,
          },
          {
            x: 'bicycle',
            y: 198,
          },
          {
            x: 'horse',
            y: 49,
          },
          {
            x: 'skateboard',
            y: 250,
          },
          {
            x: 'others',
            y: 48,
          },
        ],
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
    yFormat=" >-.2f"
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

export default Line;

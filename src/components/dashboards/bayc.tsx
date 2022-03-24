import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPanel,
  EuiSpacer,
  EuiStat,
} from '@elastic/eui';
import dynamic from 'next/dynamic';

const BubbleChart = dynamic(() => import('@/components/Charts/BubbleChart'), {
  ssr: false,
});

const Feed = dynamic(() => import('@/components/Feed'), {
  ssr: false,
});

const LineChart = dynamic(() => import('@/components/Charts/Line'), {
  ssr: false,
});

type DashboardProps = {
  avgPrice: number | string;
  highPrice: number | string;
  lowPrice: number | string;
  lineAverage: Array<Record<string, unknown>>;
  lineVolume: Array<Record<string, unknown>>;
  bubbleAllSales: Array<Record<string, unknown>>;
};

const Dashboard = ({
  highPrice,
  avgPrice,
  lowPrice,
  lineAverage,
  lineVolume,
  bubbleAllSales,
}: DashboardProps) => {
  const formatBubbleData = (bubbleAllSales: Array<Record<any, any>>) => {
    return bubbleAllSales.map((item) => ({
      x: new Date(item.timestamp).getHours(),
      y: item.value?.shifted,
    }));
  };

  return (
    <EuiPage paddingSize='none'>
      <EuiPageBody>
        {/* !add super date picker filter https://elastic.github.io/eui/#/forms/super-date-picker */}
        <EuiPanel>
          <div>Filter Bar: Rarity / TIME RANGE</div>
        </EuiPanel>
        {/* <EuiSuperDatePicker onTimeChange={() => {}} />; */}
        <EuiPageContent
          borderRadius='none'
          hasShadow={false}
          paddingSize='none'
        >
          <EuiPageContentBody restrictWidth paddingSize='l'>
            <EuiFlexGroup alignItems='flexEnd'>
              <EuiFlexItem grow={6}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title={highPrice}
                        description='High'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title={lowPrice}
                        description='Low'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title={avgPrice}
                        description='Average'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title='100'
                        description='Owners'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>
                </EuiFlexGroup>

                <EuiSpacer size='l' />
                <EuiPanel
                  style={{
                    height: '400px',
                    width: '100%',
                  }}
                >
                  <div>bubble chart for the sales</div>
                  <BubbleChart
                    data={[
                      { id: 'sales', data: formatBubbleData(bubbleAllSales) },
                    ]}
                  />
                </EuiPanel>
                <EuiSpacer size='l' />
                <EuiPanel
                  style={{
                    height: '400px',
                    width: '100%',
                  }}
                >
                  <div>line chart averege sale price</div>
                  <LineChart data={lineAverage} />
                </EuiPanel>
                <EuiSpacer size='l' />
                <EuiPanel
                  style={{
                    height: '400px',
                    width: '100%',
                  }}
                >
                  <div>line for sum</div>
                  <LineChart data={lineVolume} />
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem grow={4}>
                <Feed />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Dashboard;

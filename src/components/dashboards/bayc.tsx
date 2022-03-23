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
  console.log({ bubbleAllSales });

  const formatData = (bubbleAllSales: Array<Record<any, any>>) => {
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
                    data={[{ id: 'sales', data: formatData(bubbleAllSales) }]}
                  />
                </EuiPanel>
                <EuiSpacer size='l' />
                <EuiPanel>
                  <div>line chart averege sale price</div>
                  <div>
                    <img src='/download.svg' />
                  </div>
                </EuiPanel>
                <EuiSpacer size='l' />
                <EuiPanel>
                  <div>line for sum</div>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem grow={4}>
                Feed here
                {/* <Feed /> */}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Dashboard;

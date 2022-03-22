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

const Dashboard = () => {
  return (
    <EuiPage paddingSize='none'>
      <EuiPageBody>
        {/* !add super date picker filter https://elastic.github.io/eui/#/forms/super-date-picker */}
        <EuiPanel>
          <div>Filter Bar: Rarity / TIME RANGE</div>
        </EuiPanel>

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
                        title='100'
                        description='High'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title='100'
                        description='Low'
                        titleColor='primary'
                      />
                    </EuiPanel>
                    <EuiSpacer size='l' />
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiPanel>
                      <EuiStat
                        title='100'
                        description='Items'
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

                <BubbleChart />
                <EuiSpacer size='l' />
                <EuiPanel>
                  <div>bubble chart for the sales</div>
                  <div>
                    <img src='/download.svg' />
                  </div>
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

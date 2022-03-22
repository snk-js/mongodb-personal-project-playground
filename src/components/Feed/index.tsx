import {
  EuiAvatar,
  EuiComment,
  EuiCommentList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextColor,
} from '@elastic/eui';

const Feed = () => {
  return (
    <EuiCommentList>
      <EuiComment type='update' username='snk'>
        timelineIcon=
        <EuiAvatar
          imageUrl='https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          size='l'
          name='NFT NAME'
        />
      </EuiComment>

      <div>
        <EuiFlexGroup>
          <EuiFlexItem grow={6}>
            <div style={{ width: 100 + 'px' }}>
              <b>NFT NAME</b>
            </div>
            <div style={{ width: 100 + 'px' }}>
              <EuiTextColor color='subdued'>TIMESTAMP TIME AGO</EuiTextColor>
            </div>
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            <b>ΞVALUE.SHIFTED</b>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiCommentList>
  );
};

export default Feed;

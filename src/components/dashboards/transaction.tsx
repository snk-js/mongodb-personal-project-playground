import {
  EuiAvatar,
  EuiBadge,
  EuiComment,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import Link from 'next/link';

const Transaction = (props) => (
  // FadeIn
  <div>
    <EuiComment
      username={props.data.name}
      type='update'
      event={'purchased for ' + props.data.value + 'eth'}
      timestamp={props.data.date_ago}
      timelineIcon={
        <EuiAvatar
          imageUrl='https://opensea.io/static/images/logos/opensea.svg'
          size='l'
          name='OpenSea'
        />
      }
    >
      <EuiText>
        <Link
          href={{
            pathname: `/tx/${props.data.hash}`,
          }}
        >
          {props.data.hash}
        </Link>
        <EuiSpacer size='s' />
      </EuiText>

      <EuiFlexGroup responsive={false} alignItems='center' gutterSize='s'>
        <EuiFlexItem grow={false}>
          <EuiBadge color='primary'>OpenSea</EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiBadge color='primary'>_atomicMatch</EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiBadge color='success'>Chart Values</EuiBadge>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiComment>
  </div>
);

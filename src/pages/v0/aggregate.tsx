import axios from 'axios';
import { useRouter } from 'next/router';

const Comp = () => {
  const router = useRouter();

  const params = router.query;

  return (
    <div
      style={{
        display: 'flex',
        width: '100vh',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {JSON.stringify(params)}
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  /* API calls for the following charts:

    - output can be run in mongodb shell: db.transaction.aggregate(<OUTPUT>) or agg pipeleine builder in compass
    
    line chart (all of opensea volume):
    /api/v0/aggregate?contract_address=0x7f268357a8c2552623316e2562d90e642bb538e5&nft.event=sale&group_by=minute&operation=avg&num=30&field=value.shifted

    line chart for a specific nft:
    /api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&group_by=minute&operation=avg&num=30&field=value.shifted

    max price for nft (group_by field left out):
    /api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&operation=max&num=30&field=value.shifted

    min price for nft (group_by field left out):
    /api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&operation=min&num=30&field=value.shifted

    avg price for nft (group_by field left out):
    /api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&operation=avg&num=30&field=value.shifted

    */

  const lineChart = await axios.get(
    'http://localhost:3000' +
      '/api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&group_by=minute&operation=avg&num=30&field=value.shifted'
  );
  // const lineChartForSpecificNft = await axios.get(
  //   'http://localhost:3000' +
  //     '/api/v0/aggregate?contract_address=0x7f268357a8c2552623316e2562d90e642bb538e5&nft.event=sale&group_by=minute&operation=avg&num=30&field=value.shifted'
  // );
  // const maxPrice = await axios.get(
  //   'http://localhost:3000' +
  //     '/api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&operation=max&num=30&field=value.shifted'
  // );
  // const minPrice = await axios.get(
  //   'http://localhost:3000' +
  //     '/api/v0/aggregate?contract_address=0x7f268357a8c2552623316e2562d90e642bb538e5&nft.event=sale&group_by=minute&operation=avg&num=30&field=value.shifted'
  // );

  // const avgPrice = await axios.get(
  //   'http://localhost:3000' +
  //     '/api/v0/aggregate?nft.contract=0x9401518f4ebba857baa879d9f76e1cc8b31ed197&nft.event=sale&operation=avg&num=30&field=value.shifted'
  // );

  console.log({
    lineChart,
    // lineChartForSpecificNft,
    // maxPrice,
    // minPrice,
    // avgPrice,
  });

  return {
    props: { ok: 'ok' },
  };
}

export default Comp;

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
  const getAggregate = await axios.get(
    'http://localhost:3000' + '/api/v0/aggregate'
  );

  return {
    props: { ok: 'ok' },
  };
}

export default Comp;

import { getSession } from 'next-auth/react';
// import styles from './styles.module.scss';
import Layout from '@/components/profile/layout';

export default function index({ user, tab }) {
  return (
    <Layout session={user.user} tab={tab}>
      index
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}

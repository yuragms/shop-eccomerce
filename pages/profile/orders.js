import { getSession } from 'next-auth/react';
// import styles from './styles.module.scss';
import Layout from '@/components/profile/layout';
import Order from '@/models/Order';

export default function index({ user, tab, orders }) {
  return (
    <Layout session={user.user} tab={tab}>
      {orders.map((o) => (
        <span>
          {' '}
          {o._id} <br />
        </span>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  //--------------
  const filter = query.q.split('__')[1];
  let orders = [];
  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({ createdAt: -1 })
      .lean();
  } else if (filter == 'paid') {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({ createdAt: -1 })
      .lean();
  } else if (filter == 'unpaid') {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({ createdAt: -1 })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({ createdAt: -1 })
      .lean();
  }
  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

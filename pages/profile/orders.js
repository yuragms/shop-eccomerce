import { getSession } from 'next-auth/react';
import styles from '../../styles/profile.module.scss';
import Layout from '@/components/profile/layout';
import Order from '@/models/Order';
import Head from 'next/head';
import { ordersLinks } from '@/data/profileSidebar';
import Link from 'next/link';
import { GrView } from 'react-icons/gr';

export default function index({ user, tab, orders }) {
  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className={styles.orders}>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li key={i}>
                <Link href="">{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Products</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>view</td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>
                  {order.products.map((p) => (
                    <img src={p.image} key={p._id} alt="" />
                  ))}
                </td>
                <td>
                  {order.paymentMethod == 'paypal'
                    ? 'Paypal'
                    : order.paymentMethod == 'credit_card'
                    ? 'Credit Card'
                    : 'COD'}
                </td>
                <td>{order.total}$</td>
                <td>
                  {order.isPaid ? (
                    <img src="../../../images/verified.png" alt="" />
                  ) : (
                    <img src="../../../images/unverified.png" alt="" />
                  )}
                </td>
                <td>{order.status}</td>
                <td>
                  <GrView />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {orders.map((o) => (
        <span>
          {' '}
          {o._id} <br />
        </span>
      ))} */}
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

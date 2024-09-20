import Layout from '@/components/admin/layout';
import styles from '../../../styles/dashboard.module.scss';
import { toast } from 'react-toastify';
import Product from '@/models/Product';
import User from '@/models/User';
import Order from '@/models/Order';
import db from '@/utils/db';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Dropdown from '@/components/admin/dashboard/dropdown';
import Notifications from '@/components/admin/dashboard/notifications';
import { TbUsers } from 'react-icons/tb';
import { SlHandbag } from 'react-icons/sl';
import { SiProducthunt } from 'react-icons/si';
import { GiTakeMyMoney } from 'react-icons/gi';

export default function dashboard({ users, orders, products }) {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Shoppay - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>+{(orders.reduce((a, val) => a + val.total), 0)}$</h4>
              <h5>
                +
                {
                  (orders
                    .filter((o) => !o.isPaid)
                    .reduce((a, val) => a + val.total),
                  0)
                }
                $
              </h5>
              <span>Total Earings</span>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  await db.connectDb();
  const users = await User.find({}).lean();
  const orders = await Order.find({})
    .populate({ path: 'user', model: User })
    .lean();
  const products = await Product.find({})
    // .populate({ path: "category", model: Category })
    // .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

import Layout from '@/components/admin/layout';
import styles from '../../../../styles/products.module.scss';
import Product from '@/models/Product';
import db from '@/utils/db';
import Category from '@/models/Category';

export default function all({ products }) {
  console.log(products);
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: 'category', model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

// import styles from './styles.module.scss';

import Create from '@/components/admin/categories/Create';
import Layout from '@/components/admin/layout';
import Category from '@/models/Category';
import db from '@/utils/db';
import { useState } from 'react';

export default function categories({ categories }) {
  const [data, setData] = useState(categories);
  console.log(categories);
  return (
    <Layout>
      <div>
        <Create setCategories={setData} />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

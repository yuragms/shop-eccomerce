// import styles from './styles.module.scss';

import Create from '@/components/admin/subCategories/Create';
import List from '@/components/admin/subCategories/List';
import Layout from '@/components/admin/layout';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import db from '@/utils/db';
import { useState } from 'react';

export default function subCategories({ categories, subCategories }) {
  const [data, setData] = useState(subCategories);
  console.log('subCategory page data:', data);
  return (
    <Layout>
      <div>
        <Create setSubCategories={setData} categories={categories} />
        <List
          categories={categories}
          subCategories={data}
          setSubCategories={setData}
        />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: 'parent', model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
}

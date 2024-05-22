import Layout from '@/components/admin/layout';
import styles from '../../../../styles/products.module.scss';
import db from '@/utils/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import category from '@/pages/api/admin/category';
import subCategories from '../subCategories';

const initialState = {
  name: '',
  description: '',
  brand: '',
  sku: '',
  discount: 0,
  images: [],
  description_images: [],
  parent: '',
  category: '',
  subCategories: [],
  color: {
    color: '',
    image: '',
  },
  sizes: [
    {
      size: '',
      qty: '',
      price: '',
    },
  ],
  details: [
    {
      name: '',
      value: '',
    },
  ],
  questions: [
    {
      question: '',
      answer: '',
    },
  ],
  shippingFee: '',
};

export default function create({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState('');
  const [images, setImages] = useState('');
  const [description_images, setDescription_images] = useState('');
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     const getParentData = async () => {
  //       console.log(product.parent);
  //       const { data } = await axios.post(`/api/product/${product.parent || ''}`);
  //       if (data) {
  //         setProduct({
  //           ...product,
  //           name: data.name,
  //           description: data.description,
  //           brand: data.brand,
  //           category: data.category,
  //           subCategories: data.subCategories,
  //           questions: [],
  //           details: [],
  //         });
  //       }
  //     };
  //     getParentData();
  //   }, [product.parent]);
  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get('/api/admin/subCategory', {
        params: {
          category: product.category,
        },
      });
      setSubs(data);
    }
    getSubs();
  }, [product.category]);
  return (
    <Layout>
      <div className={styles.header}>Create Product</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: '',
          styleInout: '',
        }}
      >
        {(formik) => <Form></Form>}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const results = await Product.find().select('name subProducts').lean();
  const categories = await Category.find().lean();
  await db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

import db from '@/utils/db';
import styles from '../../styles/product.module.scss';
import Product from '@/models/Product';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import Head from 'next/head';
import Header from '@/components/header';
import MainSwiper from '@/components/productPage/mainSwiper';
import { useState } from 'react';

export default function product({ product }) {
  // console.log(product);
  const [activeImg, setActiveImg] = useState('');
  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country="" />
      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub) => (
              <span>/{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  console.log(slug, style, size);
  db.connectDb();
  // let product = await Product.findOne({ slug })
  //   .populate({ path: 'category', model: Category })
  //   .lean();
  //---------
  // let product = await Product.findOne({ slug }, function (err, result) {
  //   if (err) throw err;
  //   console.log(result.name);
  // }).lean();

  // console.log(product);
  let products = await Product.find()
    .sort({ createdAt: -1 })
    .populate({ path: 'category', model: Category })
    .populate({ path: 'subCategories', model: SubCategory })
    .lean();

  let product = null;
  let index = -1;

  for (let i = 0; i < products.length; i++) {
    if (products[i].slug === slug) {
      product = products[i];
      index = i;
      break;
    }
  }
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  console.log(subProduct);

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange:
      prices.length > 1
        ? `From ${prices[0]} to ${prices[prices.length - 1]}$`
        : '',
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
  };

  //--------
  console.log('new product', newProduct);
  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}

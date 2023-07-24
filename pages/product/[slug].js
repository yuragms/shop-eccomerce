import Product from '@/models/Product';
import styles from '../../styles/product.module.scss';
import db from '../../utils/db';

export default function product() {
  return <div> product</div>;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  db.connectDb();
  //------------
  let product = await Product.findOne({ slug }).lean();
  console.log(product);
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  console.log(prices);

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
  };
  //------------
  db.disconnectDb();
  return {
    props: {},
  };
}

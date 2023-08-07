import db from '@/utils/db';
import styles from '../../styles/product.module.scss';
import Product from '@/models/Product';

export default function product() {
  return <div>[SLUG]</div>;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  console.log(slug, style, size);
  db.connectDb();
  //---------
  // let product = await Product.findOne({ slug }, function (err, result) {
  //   if (err) throw err;
  //   console.log(result.name);
  // }).lean();

  // console.log(product);
  let products = await Product.find().sort({ createdAt: -1 }).lean();

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

  console.log(prices);
  //--------
  db.disconnectDb();

  return {
    props: {},
  };
}

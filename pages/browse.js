import db from '@/utils/db';
import styles from '../styles/browse.module.scss';
import SubCategory from '@/models/SubCategory';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { filterArray, randomize, removeDuplicates } from '@/utils/arrays_utils';
import Header from '@/components/header';
import Link from 'next/link';
import ProductCard from '@/components/productCard';
import CategoryFilter from '@/components/browse/categoryFilter';
import SizesFilter from '@/components/browse/sizesFilter';
import ColorsFilter from '@/components/browse/colorsFilter';
import BrandsFilter from '@/components/browse/brandsFilter';

export default function browse({
  products,
  categories,
  subCategories,
  sizes,
  colors,
  brands,
}) {
  return (
    <div className={styles.browse}>
      <Header />
      <div className={styles.browse__container}>
        <div className={styles.browse__path}>Home / Browse</div>
        <div className={styles.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id}>
              {c.name}
            </Link>
          ))}
        </div>
        <div className={styles.browse__store}>
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button className={styles.browse__clearBtn}>Clear All (3)</button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
            />
            <SizesFilter sizes={sizes} />
            <ColorsFilter colors={colors} />
            <BrandsFilter brands={brands} />
          </div>
          <div className={styles.browse__store_products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  let productsDb = await Product.find({}).sort({ createdAt: -1 }).lean();
  let products = randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: 'parent',
      model: Category,
    })
    .lean();
  let colors = await Product.find().distinct('subProducts.color.color');
  let brandsDb = await Product.find().distinct('brand');
  let sizes = await Product.find().distinct('subProducts.sizes.size');
  let details = await Product.find().distinct('details');
  let stylesDB = filterArray(details, 'Style');
  let patternsDb = filterArray(details, 'Pattern Type');
  let materialsDb = filterArray(details, 'Material');
  let styles = removeDuplicates(stylesDB);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);
  console.log(randomize(styles));
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
    },
  };
}

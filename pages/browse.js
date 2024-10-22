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
import StylesFilter from '@/components/browse/stylesFilter';
import PatternsFilter from '@/components/browse/patternsFilter';
import MaterialsFilter from '@/components/browse/materialsFilter';
import GenderFilter from '@/components/browse/genderFilter';
import HeadingFilters from '@/components/browse/headingFilters';
import { useRouter } from 'next/router';

export default function browse({
  products,
  categories,
  subCategories,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
}) {
  const router = useRouter();
  const filter = ({ search, category, brand, style }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    router.push({
      pathname: path,
      query: query,
    });
  };
  const searchHandler = (search) => {
    if (search == '') {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };
  return (
    <div className={styles.browse}>
      <Header searchHandler={searchHandler} />
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
            <StylesFilter data={stylesData} />
            <PatternsFilter patterns={patterns} />
            <MaterialsFilter materials={materials} />
            <GenderFilter />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters />
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  //---------------------------------------------
  const searchQuery = query.search || '';
  //---------------------------------------------
  const search =
    searchQuery && searchQuery !== ''
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  //---------------------------------------------
  await db.connectDb();
  // let productsDb = await Product.find({
  //   name: {
  //     $regex: searchQuery,
  //     $options: 'i',
  //   },
  // })
  let productsDb = await Product.find({ ...search })
    .sort({ createdAt: -1 })
    .lean();
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
  // console.log(randomize(styles));
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
    },
  };
}

import db from '@/utils/db';
// import styles from './styles.module.scss';
import SubCategory from '@/models/SubCategory';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { filterArray, randomize, removeDuplicates } from '@/utils/arrays_utils';

export default function browse() {
  return <div>browse</div>;
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  let productsDb = await Product.find({}).sort({ createdAt: -1 }).lean();
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
  console.log(randomize(styles));
  await db.disconnectDb();
  return {
    props: {
      //   products: JSON.parse(JSON.stringify(products)),
    },
  };
}

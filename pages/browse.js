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
  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
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

  const categoryHandler = (category) => {
    filter({ category });
  };
  const brandHandler = (brand) => {
    filter({ brand });
  };
  const styleHandler = (style) => {
    filter({ style });
  };
  const sizeHandler = (size) => {
    filter({ size });
  };
  const colorHandler = (color) => {
    filter({ color });
  };
  const patternHandler = (pattern) => {
    filter({ pattern });
  };
  const materialHandler = (material) => {
    filter({ material });
  };
  const genderHandler = (gender) => {
    if (gender == 'Unisex') {
      filter({ gender: {} });
    } else {
      filter({ gender });
    }
  };
  const priceHandler = (price, type) => {
    let priceQuery = router.query.price?.split('_') || '';
    let min = priceQuery[0] || '';
    let max = priceQuery[1] || '';
    let newPrice = '';
    if (type == 'min') {
      newPrice = `${price}_${max}`;
    } else {
      newPrice = `${min}_${price}`;
    }
    filter({ price: newPrice });
  };
  const multiPriceHandler = (min, max) => {
    filter({ price: `${min}_${max}` });
  };
  //-----------------------------------------
  function checkChecked(queryName, value) {
    if (router.query[queryName]?.search(value) !== -1) {
      return true;
    }
    return false;
  }
  // function replaceQuery(queryName, value) {
  //   const existedQuery = router.query[queryName];
  //   const valueCheck = existedQuery?.search(value);
  //   const _check = existedQuery?.search(`_$(value)`);
  //   let result = '';
  //   if (existedQuery) {
  //     if (valueCheck !== -1) {
  //       if (_check !== -1) {
  //         existedQuery?.replace(`_${value}`, '');
  //       } else if (valueCheck == 0) {
  //         existedQuery?.replace(`${value}_`, '');
  //       } else {
  //         result = existedQuery?.replace(value, '');
  //       }
  //     } else {
  //       result = `${existedQuery}_${value}`;
  //     }
  //   } else {
  //     result = value;
  //   }
  //   return {
  //     result,
  //     active: valueCheck && valueCheck !== -1 ? true : false,
  //   };
  // }
  function replaceQuery(queryName, value) {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const _check = existedQuery?.search(`_${value}`);
    let result = '';
    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck !== -1) {
          if (_check !== -1) {
            result = existedQuery?.replace(`_${value}`, '');
          } else if (valueCheck == 0) {
            result = existedQuery?.replace(`${value}_`, '');
          } else {
            result = existedQuery?.replace(value, '');
          }
        } else {
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: existedQuery && valueCheck !== -1 ? true : false,
    };
  }

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
              categoryHandler={categoryHandler}
              checkChecked={checkChecked}
            />
            <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />
            <ColorsFilter colors={colors} colorHandler={colorHandler} />
            <BrandsFilter
              brands={brands}
              brandHandler={brandHandler}
              checkChecked={checkChecked}
              replaceQuery={replaceQuery}
            />
            <StylesFilter data={stylesData} styleHandler={styleHandler} />
            <PatternsFilter
              patterns={patterns}
              patternHandler={patternHandler}
            />
            <MaterialsFilter
              materials={materials}
              materialHandler={materialHandler}
            />
            <GenderFilter genderHandler={genderHandler} />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters
              priceHandler={priceHandler}
              multiPriceHandler={multiPriceHandler}
            />
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
  const categoryQuery = query.category || '';
  const genderQuery = query.gender || '';
  const priceQuery = query.price?.split('_') || '';
  // const brandQuery = query.brand || '';
  //----------
  const brandQuery = query.brand?.split('_') || '';
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);
  //----------
  const styleQuery = query.style?.split('_') || '';
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);
  //----------
  const patternQuery = query.pattern?.split('_') || '';
  const patternRegex = `^${patternQuery[0]}`;
  const patternSearchRegex = createRegex(patternQuery, patternRegex);
  //----------
  const materialQuery = query.material?.split('_') || '';
  const materialRegex = `^${materialQuery[0]}`;
  const materialSearchRegex = createRegex(materialQuery, materialRegex);
  //----------
  const sizeQuery = query.size?.split('_') || '';
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);
  //----------
  const colorQuery = query.color?.split('_') || '';
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);
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

  const category =
    categoryQuery && categoryQuery !== '' ? { category: categoryQuery } : {};
  // const brand = brandQuery && brandQuery !== '' ? { brand: brandQuery } : {};
  const style =
    styleQuery && styleQuery !== ''
      ? {
          'details.value': {
            $regex: styleSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const size =
    sizeQuery && sizeQuery !== ''
      ? {
          'subProducts.sizes.size': {
            $regex: sizeSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const color =
    colorQuery && colorQuery !== ''
      ? {
          'subProducts.color.color': {
            $regex: colorSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const brand =
    brandQuery && brandQuery !== ''
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const pattern =
    patternQuery && patternQuery !== ''
      ? {
          'details.value': {
            $regex: patternSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const material =
    materialQuery && materialQuery !== ''
      ? {
          'details.value': {
            $regex: materialSearchRegex,
            $options: 'i',
          },
        }
      : {};
  const gender =
    genderQuery && genderQuery !== ''
      ? {
          'details.value': {
            $regex: genderQuery,
            $options: 'i',
          },
        }
      : {};
  const price =
    priceQuery && priceQuery !== ''
      ? {
          'subProducts.sizes.price': {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
  //---------------------------------------------
  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }

  await db.connectDb();
  // let productsDb = await Product.find({
  //   name: {
  //     $regex: searchQuery,
  //     $options: 'i',
  //   },
  // })
  let productsDb = await Product.find({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,
    ...gender,
    ...price,
  })
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
  let colors = await Product.find({ ...category }).distinct(
    'subProducts.color.color'
  );
  let brandsDb = await Product.find({ ...category }).distinct('brand');
  let sizes = await Product.find({ ...category }).distinct(
    'subProducts.sizes.size'
  );
  let details = await Product.find({ ...category }).distinct('details');
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

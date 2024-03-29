import Image from 'next/image';
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import Main from '@/components/home/main';
import FlashDeals from '@/components/home/flashDeals';
import Category from '@/components/home/category';
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from '@/data/home';
import { useMediaQuery } from 'react-responsive';
import ProductsSwiper from '@/components/productsSwiper';
import db from '@/utils/db';
import Product from '@/models/Product';
import ProductCard from '@/components/productCard';

// const inter = Inter({ subsets: ['latin'] })
// <main className={`${styles.main} ${inter.className}`}></main>

export default function Home({ country, products }) {
  // console.log('products', products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: '(max-width:850px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });
  // console.log(session);
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes / High Heels"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes / High Heels"
                products={women_shoes}
                background="#3c811f"
              />
            )}

            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#2f82ff"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvements"
            bg="#5a31f4"
          />
          <div className={styles.product}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  // console.log(products);
  let data = await axios
    .get('https://api.ipregistry.co/?key=m64nzffmbl6qteak')
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(data);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}

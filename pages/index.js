import Image from 'next/image';
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import Main from '@/components/home/main';

// const inter = Inter({ subsets: ['latin'] })
// <main className={`${styles.main} ${inter.className}`}></main>

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get('https://api.ipregistry.co/?key=m64nzffmbl6qteak')
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(data);
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}

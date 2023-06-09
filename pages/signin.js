import Footer from '@/components/footer';
import Header from '@/components/header';
import styles from '@/styles/signin.module.scss';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';

export default function signin() {
  return (
    <div>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
        </div>
      </div>
      <Footer country="Morocco" />
    </div>
  );
}

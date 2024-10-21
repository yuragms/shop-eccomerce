import Link from 'next/link';
import styles from './styles.module.scss';
import { RiSearchLine } from 'react-icons/ri';
import { FaOpencart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Main() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  // const { cart } = useSelector((state) => ({ ...state }));
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 1) {
      router.push(`/browse?search=${query}`);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <img src="../../../logo.png" alt="" />
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search_icon}>
            <RiSearchLine />
          </button>
        </form>
        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>0</span>
        </Link>
      </div>
    </div>
  );
}

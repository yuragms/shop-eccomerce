import Header from './Header';
import Menu from './Menu';
import User from './User';
import Offers from './offers';
import styles from './styles.module.scss';
import MainSwiper from './swiper';

export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}

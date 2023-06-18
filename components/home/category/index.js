import { BsArrowRightCircle } from 'react-icons/bs';
import styles from './styles.module.scss';

export default function Category({ header, products }) {
  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.map((product) => (
          <img src={product.image} alt="" />
        ))}
      </div>
    </div>
  );
}

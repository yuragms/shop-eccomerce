import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import Card from './Card';

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
            key={i}
            subCategories={subCategories}
            category={category}
            categoryHandler={categoryHandler}
            checkChecked={checkChecked}
          />
        ))}
    </div>
  );
}

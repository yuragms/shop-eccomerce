import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';

export default function Card({
  category,
  categoryHandler,
  // checkChecked,
  replaceQuery,
}) {
  const [show, setShow] = useState(false);
  const check = replaceQuery('category', category._id);
  return (
    <>
      <section>
        <li onClick={() => categoryHandler(category._id)}>
          <input
            type="radio"
            name="filter"
            id={category._id}
            checked={check.active}
          />
          <label htmlFor={category._id}>
            <a>{category.name}</a>
          </label>
          <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}

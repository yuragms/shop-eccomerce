import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';

export default function Card({ category, categoryHandler, checkChecked }) {
  const [show, setShow] = useState(false);
  const check = checkChecked('category', category._id);
  return (
    <>
      <section>
        <li onClick={() => categoryHandler(check ? {} : category._id)}>
          <input type="radio" name="filter" id={category._id} checked={check} />
          <label htmlFor={category._id}>
            <a>{category.name}</a>
          </label>
          <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}

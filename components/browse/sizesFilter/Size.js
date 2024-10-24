import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Size({ size, sizeHandler }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}

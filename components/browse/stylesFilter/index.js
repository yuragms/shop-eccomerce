import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

export default function StyleFilter({ data }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Style <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {data.map((style, i) => (
            <div className={styles.filter__sizes_size}>
              <input type="checkbox" name="style" id={style} />
              <label htmlFor={style}>{style}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

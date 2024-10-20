import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

export default function MaterialsFilter({ materials }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Material <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {materials.map((material, i) => (
            <div className={styles.filter__sizes_size}>
              <input type="checkbox" name="material" id={material} />
              <label htmlFor={material}>
                {material.length > 12
                  ? `${material.substring(0, 12)}...`
                  : material}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

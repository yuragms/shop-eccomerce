import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

export default function PatternsFilter({ patterns }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => (
            <div className={styles.filter__sizes_size}>
              <input type="checkbox" name="pattern" id={pattern} />
              <label htmlFor={pattern}>
                {pattern.length > 12
                  ? `${pattern.substring(0, 12)}...`
                  : pattern}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function ColorsFilter({ colors, colorHandler, replaceQuery }) {
  // const router = useRouter();
  // const existedColor = router.query.color || '';
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            const check = replaceQuery('color', color);
            return (
              <button
                onClick={() => colorHandler(check.result)}
                className={check.active ? styles.activeFilterColor : ''}
                style={{ background: `${color}` }}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}

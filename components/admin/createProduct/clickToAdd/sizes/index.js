import { useState } from 'react';
import styles from './styles.module.scss';
import { sizesList } from '@/data/sizes';

export default function Sizes({ sizes, product, setProduct }) {
  const [noSize, setNoSize] = useState(false);
  return (
    <div>
      <div className={styles.header}>Sizes / Quantity / Prices</div>
      <button type="reset" className={styles.click_btn}>
        {noSize ? 'click if product has size' : 'click if product has no size'}
      </button>
      {sizes
        ? sizes.map((size, i) => (
            <div className={styles.sizes} key={i}>
              <select
                name="size"
                value={noSize ? '' : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? 'none' : ''}` }}
              >
                <option value="">Select a size</option>
                {sizesList.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))
        : ''}
    </div>
  );
}

import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function BrandsFilter({
  brands,
  brandHandler,
  checkChecked,
  replaceQuery,
}) {
  const router = useRouter();
  // const existedBrand = router.query.brand || '';
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            // const check = checkChecked('brand', brand);
            const check = replaceQuery('brand', brand);
            return (
              <button
                className={`${styles.filter__brand} ${
                  check.active ? styles.activeFilter : ''
                }`}
                // onClick={() => brandHandler(brand)}
                onClick={() => brandHandler(check.result)}
              >
                <img
                  src={`../../../images/brands/${brand.trim()}.png`}
                  alt=""
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

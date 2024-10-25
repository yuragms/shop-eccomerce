import { useState } from 'react';
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

export default function GenderFilter({ genderHandler }) {
  const genders = ['Men', 'Women', 'Unisex'];
  // const genders = [
  //   {
  //     name: 'Men',
  //     value: Men,
  //   },
  //   {
  //     name: 'Women',
  //     value: 'Women',
  //   },
  //   {
  //     name: 'Unisex',
  //     value: '',
  //   },
  // ];
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Gender <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {genders.map((gender, i) => (
            <div
              className={styles.filter__sizes_size}
              onClick={() => genderHandler(gender)}
            >
              <input type="checkbox" name="gender" id={gender} />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

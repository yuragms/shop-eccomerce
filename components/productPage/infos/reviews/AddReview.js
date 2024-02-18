import { useState } from 'react';
import Select from './Select';
import styles from './styles.module.scss';

export default function AddReview({ product }) {
  const [size, setSize] = useState('second');
  return (
    <div className={styles.reviews__add}>
      <div className="flex wrap">
        <div className="flex" style={{ gap: '10px' }}>
          Size:
          <Select />
        </div>
      </div>
    </div>
  );
}

import styles from './styles.module.scss';
import { IoArrowDown } from 'react-icons/io5';

export default function Select() {
  return (
    <div className={styles.select}>
      <div className={select__header}>
        <span className="flex" style={{ padding: '0 5px' }}>
          {size || 'Select Size'}
          <IoArrowDown />
        </span>
      </div>
    </div>
  );
}

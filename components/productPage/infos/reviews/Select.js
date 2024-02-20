import { useState } from 'react';
import styles from './styles.module.scss';
import { IoArrowDown } from 'react-icons/io5';

export default function Select({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className={styles.select}>
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <span
          className={`flex ${styles.select__header_wrap}`}
          style={{ padding: '0 5px' }}
        >
          {property || `Select ${text}`}
          <IoArrowDown />
        </span>
        {visible && (
          <ul
            className={styles.select__header_menu}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {data.map((item, i) => {
              if (text == 'Size') {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

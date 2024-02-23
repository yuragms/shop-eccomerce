import { useRef } from 'react';
import styles from './styles.module.scss';

export default function Images({ images, setImages }) {
  const inputRef = useRef(null);
  return (
    <div>
      <input type="file" />
      <button className={styles.login}></button>
    </div>
  );
}

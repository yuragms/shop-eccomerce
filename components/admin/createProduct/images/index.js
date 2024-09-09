import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { ErrorMessage, useField } from 'formik';
import { useRef } from 'react';
import { showDialog } from '@/store/DialogSlice';

export default function Images({
  images,
  setImages,
  header,
  text,
  name,
  setColorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (i == 5 || images.length == 6) {
        dispatch(
          showDialog({
            header: 'Maximu 6 images are allowed.',
            msgs: [
              {
                msg: `Maximum of total six images are allowed.`,
                type: 'error',
              },
            ],
          })
        );
        return;
      }
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp'
      ) {
        dispatch(
          showDialog({
            header: 'Unsopported Format.',
            msgs: [
              {
                msg: `${img.name} format is unsupported ! only JPEG, PNG, WEBP are allowed.`,
                type: 'error',
              },
            ],
          })
        );
        files = files.filter((item) => item !== img.name);
        return;
      }
    });
  };
  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ''}`}
      >
        <div className={styles.flex}>
          {matchMedia.error && <img src="../../../images/warning.png" alt="" />}
          {header}
        </div>
        <span>
          {meta.touched && matchMedia.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name={name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      <button
        type="reset"
        disabled={images.length == 6}
        style={{ opacity: `${images.length == 6 && '0.5'}` }}
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        {text}
      </button>
    </div>
  );
}

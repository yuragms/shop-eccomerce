import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { ErrorMessage, useField } from 'formik';
import { useRef } from 'react';
import { showDialog } from '@/store/DialogSlice';
import { RiDeleteBin7Fill, RiShape2Line } from 'react-icons/ri';
import { GiExtractionOrb } from 'react-icons/gi';

export default function Style({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  // console.log('images', images);
  const [meta, field] = useField(props);
  const handleImages = (e) => {
    let img = e.target.files[0];

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
      return;
    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: 'Unsopported Format.',
          msgs: [
            {
              msg: `${img.name} size is too large, maximum of 10mb allowed.`,
              type: 'error',
            },
          ],
        })
      );
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: obj,
        });
      };
    }
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ''}`}
      >
        <div className={styles.flex}>
          {matchMedia.error && <img src="../../../images/warning.png" alt="" />}
          Pick a Product style image
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
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      {/* <div className={styles.images__main}>
        <div
          className={`${styles.images__main_grid} ${
            images.length == 2
              ? styles.grid__two
              : images.length == 3
              ? styles.grid__three
              : images.length == 4
              ? styles.grid__foor
              : images.length == 5
              ? styles.grid__five
              : images.length == 6
              ? styles.grid__six
              : ''
          }`}
        >
          {!images.length ? (
            <img src="../../../images/no_image.png" alt="" />
          ) : (
            images.map((img, i) => (
              <div className={styles.images__main_grid_wrap} key={i}>
                <div className={styles.blur}></div>
                <img src={img} alt="" />
                <div className={styles.images__main_grid_actions}>
                  <button onClick={() => handleRemove(img)}>
                    <RiDeleteBin7Fill />
                  </button>
                  <button onClick={() => setColorImage(img)}>
                    <GiExtractionOrb />
                  </button>
                  <button>
                    <RiShape2Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}
      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        Pick Style
      </button>
    </div>
  );
}
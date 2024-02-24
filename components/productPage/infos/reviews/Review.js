import { Rating } from '@mui/material';
import styles from './styles.module.scss';

export default function Review({ review }) {
  console.log(review);
  const { name, image } = review.reviewBy;
  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>
            {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
          </h4>
          <img src={image} alt="" />
        </div>
        <div className={styles.review}>
          <Rating
            name="half-rating-read"
            defaultValue={review.rating}
            readOnlystyle={{ color: '#facf19' }}
          />
        </div>
      </div>
    </div>
  );
}

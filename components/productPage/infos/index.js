import { Rating } from '@mui/material';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

export default function Infos({ product }) {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
  return (
    <div className={styles.infos}>
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: '#FACF19' }}
          />
          {product.numReviews}
          {product.numReviews == 1 ? 'review' : 'reviews'}
        </div>
        <div className={styles.infos__price}>
          {product.priceRange ? (
            <h2>{product.priceRange}</h2>
          ) : (
            <h1>{product.price}</h1>
          )}
          {product.discount > 0 ? (
            <h3>
              <span>{product.priceBefore}$</span>
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ''
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : 'Free Shipping'}
        </span>
        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{' '}
          pieces available.
        </span>
        <div className={styles.infos__size}>
          <h4>Select a Size :</h4>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                href={`/product/${product.slug}?style${router.query.style}&size${i}`}
              >
                <div>{size.size}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

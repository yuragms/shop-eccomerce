import { BsHeart } from 'react-icons/bs';
import styles from './styles.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useState } from 'react';

export default function Product({ product }) {
  const [active, setActive] = useState();
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        M74JJI Official Store
      </div>
      <div className={styles.product__image}>
        <div
          className={`
          ${styles.checkbox} 
          ${active ? styles.active : ''}
          `}
          onClick={() => handleSelect()}
        ></div>
        <img src={product.images[0].url} alt="" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: '2' }}>
              <BsHeart />
            </div>
            <div style={{ zIndex: '2' }}>
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)}$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{(product.price * product.qty).toFixed(2)}$
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD{product.priceBefore}$
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button disabled={product.qty < 2}>-</button>
              <span>{product.qty}</span>
              <button disabled={product.qty == product.quantity}>+</button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping} Shipping fee`
              : 'Free Shipping'}
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to ypur whishlist it may get
              restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

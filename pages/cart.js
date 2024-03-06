import Header from '@/components/cart/header';
import styles from '../styles/cart.module.scss';
import React from 'react';
import Empty from '@/components/cart/empty';
import { useSelector } from 'react-redux';
import Product from '@/components/cart/product';

export default function cart() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 1 ? (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product product={product} key={product._uid} />
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
      cart
    </>
  );
}

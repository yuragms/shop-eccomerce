import Header from '@/components/cart/header';
import styles from '../styles/cart.module.scss';
import React, { useState } from 'react';
import Empty from '@/components/cart/empty';
import { useSelector } from 'react-redux';
import Product from '@/components/cart/product';
import CartHeader from '@/components/cart/cartHeader';
import Checkout from '@/components/cart/checkout';

export default function cart() {
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal="5458"
              shippingFee={0}
              total="5458"
              selected={[]}
            />
          </div>
        ) : (
          <Empty />
        )}
      </div>
      cart
    </>
  );
}

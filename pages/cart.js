import Header from '@/components/cart/header';
import styles from '../styles/cart.module.scss';
import React, { useEffect, useState } from 'react';
import Empty from '@/components/cart/empty';
import { useDispatch, useSelector } from 'react-redux';
import Product from '@/components/cart/product';
import CartHeader from '@/components/cart/cartHeader';
import Checkout from '@/components/cart/checkout';
import { updateCart, emptyCart } from '@/store/cartSlice';
import PaymentMethods from '@/components/cart/paymentMethods';
import ProductsSwiper from '@/components/productsSwiper';
import { women_swiper } from '@/data/home';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { saveCart } from '@/requests/user';
import axios from 'axios';

export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  //------------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const update = async () => {
      const { data } = await axios.post('/api/updateCart', {
        products: cart.cartItems,
      });

      dispatch(updateCart(data));
    };
    if (cart.cartItems.length > 0) {
      update();
    }
  }, []);
  // lesson100
  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);
  //------------------------
  const saveCartToDbHandler = async () => {
    // Router.push('/checkout');
    if (session) {
      const res = saveCart(selected);
      setTimeout(() => {
        Router.push('/checkout');
      }, 300);
      // Router.push('/checkout');
    } else {
      signIn();
    }
  };
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
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <ProductsSwiper products={women_swiper} />
      </div>
    </>
  );
}

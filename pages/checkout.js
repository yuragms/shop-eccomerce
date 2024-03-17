import { getSession } from 'next-auth/react';
import styles from '../styles/checkout.module.scss';
import { Context } from 'react-responsive';
import User from '@/models/User';
import Cart from '@/models/Cart';

export default function checkout() {
  return <div>checkout</div>;
}

export async function getServerSideProps(Context) {
  // console.log(Context);
  const session = await getSession(Context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  console.log(cart);
  return {
    props: {},
  };
}

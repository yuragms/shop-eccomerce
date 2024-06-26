import { getSession } from 'next-auth/react';
import styles from '../styles/checkout.module.scss';
import { context } from 'react-responsive';
import User from '@/models/User';
import Cart from '@/models/Cart';
import db from '@/utils/db';
import Header from '@/components/header';
import Shipping from '@/components/checkout/shipping';
import { useEffect, useState } from 'react';
import Products from '@/components/checkout/products';
import { paymentMethods } from '@/data/paymentMethods';
import Payment from '@/components/checkout/payment';
import Summary from '@/components/checkout/summary';

export default function checkout({ cart, user }) {
  // const [selectedAddress, setSelectedAddress] = useState(user?.address[0]);
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  useEffect(() => {
    let check = addresses.find((address) => address.active == true);
    if (check) {
      setSelectedAddress(check);
    }
  }, [addresses]);
  console.log('selectedAddress', selectedAddress);
  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            // selectedAddress={selectedAddress}
            // setSelectedAddress={setSelectedAddress}
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(Context);
  db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();

  if (!cart) {
    return {
      redirect: {
        destination: '/cart',
      },
    };
  }

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import styles from './styles.module.scss';
const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      //   iconColor: '#000',
      //   color1: '#000',
      //   fontSize: '16px',
      fontSmoothing: 'antialiased',
      //   ':-webkit-autofill': { color: '#000' },
      //   '::placeholder': { color: '#000' },
    },
    invalid: {
      iconColor: '#fd010169',
      color: '#fd010169',
    },
  },
};

export default function Form() {
  const [error, seterror] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {};
  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">PAY</button>
        {error && <span className={styles}>{error}</span>}
      </form>
    </div>
  );
  return <div>Form</div>;
}

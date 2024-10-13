import { signOut } from 'next-auth/react';
import styles from './styles.module.scss';
import { useState } from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

export default function Item({ item, visible, index }) {
  const [show, setShow] = useState(visible);
  return (
    <li>
      {item.heading == 'Sign out' ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
    </li>
  );
}

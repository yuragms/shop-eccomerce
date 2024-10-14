import { signOut } from 'next-auth/react';
import styles from './styles.module.scss';
import { useState } from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import Link from 'next/link';
import slugify from 'slugify';
import { useRouter } from 'next/router';

export default function Item({ item, visible, index }) {
  const [show, setShow] = useState(visible);
  const router = useRouter();
  return (
    <li>
      {item.heading == 'Sign out' ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <li
              className={
                (router.query.q || '') == slugify(link.name, { lower: true })
                  ? styles.active
                  : ''
              }
            >
              <Link
                href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                  lower: true,
                })}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

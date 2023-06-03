import styles from './styles.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';

export default function Top() {
  return (
    <div className={styles.top}>
      <div className={styles.top__contaiter}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            <img
              src="
              https://www.seekpng.com/png/detail/840-8405398_green-star-images-morocco-flag-star-png.png"
              alt=""
            />
          </li>
          <li>
            <span>Morocco / usd</span>
          </li>
          <li>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li>
            <div className={styles.flex}>
              <RiAccountPinCircleLine />
              <span>Account</span>
              <RiArrowDropDownFill />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { toggleSidebar } from '@/store/ExpandSlice';
import { MdArrowForwardIos, MdSpaceDashboard } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session } = useSession({ required: true });

  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  console.log(useSession);
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ''}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${expand ? 'rotate(180deg)' : ''}`,
            transition: 'all .2s',
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.image} alt="" />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user?.image}</span>
          </div>
        </div>
        <ul>
          <li>
            <Link href="">
              <MdSpaceDashboard />
              <span className={styles.show}>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

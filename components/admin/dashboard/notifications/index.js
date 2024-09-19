import Link from 'next/link';
import styles from './styles.module.scss';
import { useState } from 'react';
import { IoNotificationsSharp } from 'react-icons/io5';
import { notificationsData } from '../../../../data/notifications';

export default function Notifications({ userImage }) {
  const [show, setShow] = useState(true);
  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styles.dropdown__svg}>
        <IoNotificationsSharp />
      </div>
      <div
        className={`${styles.dropdown__content} ${show ? styles.active : ''}`}
      >
        <div className={styles.dropdown__content_notifications}>
          {notificationsData.map((n, i) => (
            <>
              {n.type == 'order' ? (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  <img src={n.image} alt="" />
                  <p></p>
                </div>
              ) : (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  {' '}
                </div>
              )}
            </>
          ))}
        </div>

        <div className={styles.dropdown__content_footer}>
          <Link href="/admin/dashboard/notificatins">
            See all notifications
          </Link>
        </div>
      </div>
    </div>
  );
}

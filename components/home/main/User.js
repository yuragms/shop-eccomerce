import { useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Navigation } from 'swiper';
import { userSwiperArray } from '@/data/home';

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <img src="../../../images/userHeader.jpg" alt="" />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt=""
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            Navigaation={true}
            modules={[EffectCards, Navigation]}
            className="userMenu__swiper"
            styles={{ maxWidth: '180px', height: '240px', marginTop: '1rem' }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>{' '}
    </div>
  );
}

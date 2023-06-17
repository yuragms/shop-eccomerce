import { MdFlashOn } from 'react-icons/md';
import styles from './styles.module.scss';
import Countdown from '@/components/countdown';

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper';
import { flashDealsArray } from '@/data/home';
import FlashCard from './Card';

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown />
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide>
              <FlashCard product={product} key={i} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

import { useState } from 'react';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { calcaulateDiff } from './utils';
const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);

  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calcaulateDiff(timeInMs));
  };
  return (
    <div className={styles.countdown}>
      <span>1</span>
      <span>2</span>
      <b>:</b>
      <span>4</span>
      <span>5</span>
      <b>:</b>
      <span>1</span>
      <span>0</span>
    </div>
  );
}

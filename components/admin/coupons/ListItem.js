import { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField } from '@mui/material';

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(coupon.startDate);
  const [endDate, setEndDate] = useState(coupon.endDate);
  console.log('coupon', coupon);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const input = useRef(null);
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete('/api/admin/coupon', {
        params: { id },
      });
      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put('/api/admin/coupon', {
        id,
        coupon: name || coupon.coupon,
        discount: discount || coupon.discount,
        startDate: startDate || coupon.startDate,
        endDate: endDate || coupon.endDate,
      });
      setCoupons(data.coupons);
      setOpen(false);
      // setName('');
      // setDiscount('');
      // setStartDate(new Date());
      // setEndDate(tomorrow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ''}
        type="text"
        value={name ? name : coupon.coupon}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <input
            className={open ? styles.open : ''}
            type="text"
            value={discount ? discount : coupon.discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={!open}
            ref={input}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={handleStartDate}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date()}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={handleEndDate}
              renderInput={(params) => <TextField {...params} />}
              minDate={tomorrow}
            />
          </LocalizationProvider>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(coupon._id)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName('');
              setDiscount('');
              setStartDate(new Date());
              setEndDate(tomorrow);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(coupon._id)} />
      </div>
    </li>
  );
}

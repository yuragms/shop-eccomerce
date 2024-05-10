import { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
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
        name,
      });
      setCoupons(data.coupons);
      setOpen(false);
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
      <input
        className={open ? styles.open : ''}
        type="text"
        value={discount ? discount : discount.discount}
        onChange={(e) => setDiscount(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
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

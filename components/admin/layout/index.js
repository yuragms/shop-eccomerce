import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './sidebar';
import styles from './styles.module.scss';
import DialogModal from '@/components/dialogModal';
import { hideDialog } from '@/store/DialogSlice';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = !expandSidebar.expandSidebar;
  console.log(showSidebar);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  return (
    <div className={styles.layout}>
      {/* <DialogModal /> */}
      <Sidebar />
      <div
        style={{ marginLeft: `${showSidebar ? '80px' : '280px'}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}

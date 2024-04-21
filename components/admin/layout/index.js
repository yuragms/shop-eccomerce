import { useSelector } from 'react-redux';
import Sidebar from './sidebar';
import styles from './styles.module.scss';

export default function Layout({ children }) {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = !expandSidebar.expandSidebar;
  console.log(showSidebar);
  return (
    <div className={styles.layout}>
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

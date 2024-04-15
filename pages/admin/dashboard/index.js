import Layout from '@/components/admin/layout';
import styles from '../../../styles/dashboard.module.scss';
import { toast } from 'react-toastify';

export default function dashboard() {
  return (
    <div>
      <Layout>
        {/* <button
          onClick={() =>
            toast.error('Everything is working fine !!', {
              position: 'bottom-right',
            })
          }
        >
          Click to show toastify
        </button> */}
      </Layout>
    </div>
  );
}

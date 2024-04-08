import Header from '@/components/header';
import styles from '../../styles/order.module.scss';
import Order from '@/models/Order';

export default function order({ order }) {
  return (
    <>
      <Header country="country" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  const order = await Order.findById(id).populate('user').lean();
  console.log('order', order);
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

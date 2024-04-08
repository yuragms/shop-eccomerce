import Header from '@/components/header';
import styles from '../../styles/order.module.scss';
import Order from '@/models/Order';
import { IoIosArrowForward } from 'react-icons/io';

export default function order({ order }) {
  return (
    <>
      <Header country="country" />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{' '}
                {order._id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status :{' '}
                {order.isPaid ? (
                  <img src="../../../images/verified.png" alt="paid" />
                ) : (
                  <img src="../../../images/unverified.png" alt="paid" />
                )}
              </div>
              <div className={styles.order_header_status}>
                Order Status :
                <span
                  className={
                    order.status == 'Not Processed'
                      ? styles.not_processed
                      : order.status == 'Processing'
                      ? styles.processing
                      : order.status == 'Dispatched'
                      ? styles.dispatched
                      : order.status == 'Cancelled'
                      ? styles.cancelled
                      : order.status == 'Completed'
                      ? styles.completed
                      : ''
                  }
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {order.products.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {product.price}$ x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>
                      {product.price * product.qty}$
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                {order.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal</span>
                      <span>{order.totalBeforeDiscount}$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied <em>({order.couponApplied})</em>{' '}
                      </span>
                      <span>
                        -{(order.totalBeforeDiscount - order.total).toFixed(2)}$
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax price</span>
                      <span>+{order.taxPrice}$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL TO PAY</span>
                      <b>{order.total}$</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax price</span>
                      <span>+{order.taxPrice}$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL TO PAY</span>
                      <b>{order.total}$</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer's Order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={order.user.image} alt="" />
                  <div>
                    <span>{order.user.name}</span>
                    <span>{order.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                <span>
                  {order.shippingAddress.firstName}{' '}
                  {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state},{order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.country}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Billing Address</h2>
                <span>
                  {order.shippingAddress.firstName}{' '}
                  {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state},{order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

import { createRouter } from 'next-connect';
import db from '@/utils/db';
import auth from '@/middware/auth';
import Order from '@/models/Order';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// console.log('stripeeeee', stripe);

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { amount, id } = req.body;
    const order_id = req.query.id;
    console.log('stripe-amount:', amount);
    console.log('stripe-id:', id);
    console.log('stripe-order_id:', order_id);
    console.log('req.headers.referer:', req.headers.referer);
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'USD',
      description: 'M74JJI Store',
      payment_method: id,
      confirm: true,
      return_url: req.headers.referer,
    });
    const order = await Order.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email_address: payment.email_address,
      };
      await order.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }

    db.disconnectDb();
  } catch (error) {
    console.log('tryCatcherror:', error);
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();

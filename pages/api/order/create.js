import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
import auth from '@/middware/auth';
import Order from '@/models/Order';

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();

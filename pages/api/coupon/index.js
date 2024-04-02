// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
import auth from '@/middware/auth';
import Coupon from '@/models/Coupon';
// import auth from '../../../middleware/auth';

// const handler = nc();
// const router = createRouter().use(auth);
const router = createRouter();

router.post(async (req, res) => {
  console.log('coupon');
  try {
    db.connectDb();
    const { coupon, startDate, endDate, discount } = req.body;
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res
        .status(400)
        .json({
          message:
            'This Coupon name already exists, try with a different name.',
        });
    }
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();

// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import User from '@/models/User';
import auth from '@/middware/auth';
import Coupon from '@/models/Coupon';
import Cart from '@/models/Cart';

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon } = req.body;
    const user = await User.findById(req.user);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon == null) {
      return res.json({ message: 'Invalid coupon' });
    }
    const { cartTotal } = await Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    res.json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

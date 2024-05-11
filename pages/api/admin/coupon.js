import { createRouter } from 'next-connect';
import db from '@/utils/db';
import auth from '@/middware/auth';
import slugify from 'slugify';
import Coupon from '@/models/Coupon';

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;
    db.connectDb();
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res
        .status(400)
        .json({ message: 'Coupon already exist, Try a different coupon' });
    }
    await new Coupon({ coupon, discount, startDate, endDate }).save();
    db.disconnectDb();
    res.json({
      message: `Coupon ${coupon} has been created successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  console.log('eeee');
  try {
    const { id } = req.query;
    db.connectDb();
    await Coupon.findByIdAndRemove(id);
    db.disconnectDb();
    res.json({
      message: 'Coupon has been deleted successfully.',
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

router.put(async (req, res) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;
    db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
    });
    db.disconnectDb();
    res.json({
      message: 'Coupon has been updated successfully.',
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();

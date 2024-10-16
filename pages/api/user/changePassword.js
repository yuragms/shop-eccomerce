// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
import auth from '@/middware/auth';
import bcrypt from 'bcrypt';
// import auth from '../../../middleware/auth';

// const handler = nc();
// const router = createRouter().use(auth);
const router = createRouter().use(auth);

// handler.get(async (req, res) => {
router.put(async (req, res) => {
  console.log('work2');
  try {
    db.connectDb();
    const { current_password, password } = req.body;
    const user = await User.findById(req.user);
    const crypted_password = await bcrypt.hash(password, 12);
    if (!user.password) {
      await user.updateOne({ password: crypted_password });
      return res.status(200).json({
        message:
          'We noticed that you are using a  social login so we added a password to login with in the future',
      });
    }
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is wrong!' });
    }
    await user.updateOne({ password: crypted_password });
    // let newUserData = await user.updateOne(
    //   {
    //     $push: {
    //       address: address,
    //     },
    //   },
    //   { new: true }
    // );
    // res.json({ addresses: newUserData.address });
    db.disconnectDb();
    res.json({ message: 'Password has been changes successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

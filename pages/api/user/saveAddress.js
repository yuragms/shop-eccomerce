// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
// import auth from '../../../middleware/auth';

// const handler = nc();
// const router = createRouter().use(auth);
const router = createRouter().use(auth);

// handler.get(async (req, res) => {
router.post(async (req, res) => {
  console.log('work2');
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    await user.updateOne({
      $push: {
        address: address,
      },
    });
    res.json(address);
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

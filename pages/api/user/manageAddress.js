// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import User from '@/models/User';
import auth from '@/middware/auth';

const router = createRouter().use(auth);

router.put(async (req, res) => {
  console.log('work manageAddress');
  try {
    console.log('work manageAddress');
    db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user);
    let user_addresses = user.address;
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    // const newUserData = await user.updateOne(
    //   {
    //     address: addresses,
    //   },
    //   { new: true }
    // );
    // res.status(200).json({ addresses: newUserData.address });
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );
    db.disconnectDb();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();

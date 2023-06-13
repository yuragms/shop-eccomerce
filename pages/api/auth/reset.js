import { createRouter } from 'next-connect';
import db from '@/utils/db';
import { validateEmail } from '@/utils/validation';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { createActivationToken, createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: 'This Account does not exist.' });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    res.json({ email: user.email });
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();

// export default async function handler(req, res) {
//   try {
//     //   return res.send('welcom from sign up api');
//     return await db.connectDb();
//     console.log(req.body);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// }

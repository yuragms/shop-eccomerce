import { createRouter } from 'next-connect';
import db from '@/utils/db';
import { validateEmail } from '@/utils/validation';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'This email already exist.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be atleast 6 characters.' });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, '', 'Activate your account');
    await db.disconnectDb();
    res.json({
      message: 'Register success! Please activate your email to start.',
    });
    console.log(req.body);
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

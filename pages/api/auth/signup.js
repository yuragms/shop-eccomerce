import { createRouter } from 'next-connect';
import db from '@/utils/db';
import { validateEmail } from '@/utils/validation';

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
    console.log(req.body);
  } catch (error) {
    res.statusCode(500).json({ message: error.message });
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

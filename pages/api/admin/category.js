import { createRouter } from 'next-connect';
import db from '@/utils/db';
import auth from '@/middware/auth';
import slugify from 'slugify';
import Category from '@/models/Category';

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: 'Category already exist, Try a different name' });
    }
    await new Category({ name, slug: slugify(name) }).save();
    db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
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
    await Category.findByIdAndRemove(id);
    db.disconnectDb();
    res.json({
      message: 'Category has been deleted successfully.',
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();

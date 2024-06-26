import { createRouter } from 'next-connect';
import db from '@/utils/db';
import auth from '@/middware/auth';
import slugify from 'slugify';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: 'SubCategory already exist, Try a different name' });
    }
    await new SubCategory({ name, parent, slug: slugify(name) }).save();
    db.disconnectDb();
    res.json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
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
    await SubCategory.findByIdAndRemove(id);
    db.disconnectDb();
    res.json({
      message: 'SubCategory has been deleted successfully.',
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

router.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    db.disconnectDb();
    res.json({
      message: 'SubCategory has been updated successfully.',
      subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

router.get(async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);
    if (!category) {
      return res.json([]);
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select('name');
    console.log(results);
    db.disconnectDb();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();

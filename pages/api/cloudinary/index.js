import { createRouter } from 'next-connect';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import db from '@/utils/db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  cloud_key: process.env.CLOUDINARY_KEY,
  cloud_secret: process.env.CLOUDINARY_SECRET,
});

const router = createRouter().use(fileUpload({ useTempFiles: true }));
export const config = {
  api: {
    bodyParser: false,
  },
};
router.post(async (req, res) => {
  try {
    let files = Object.values(req.files).flat();
    for (const file of files) {
    }
    // res.json(files);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();

// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';

// const handler = nc();
const router = createRouter();

// handler.get(async (req, res) => {
router.post(async (req, res) => {
  try {
    db.connectDb();
    const promises = req.body.products.map(async (p) => {
      let dbProduct = await Product.findById(p._id).lean();
      let originalPrice = dbProduct.subPoducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).price;
      let quantity = dbProduct.subPoducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).qty;
      let discount = dbProduct.subPoducts[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });
    const data = await Promise.all(promises);
    db.disconnectDb();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

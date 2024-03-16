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
      // console.log('dbProduct', dbProduct);
      let originalPrice = dbProduct.subPoducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).price;
      // ошибка здесь [p.style]
      console.log('originalPrice', originalPrice);
      let quantity = dbProduct.subPoducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).qty;
      // console.log('quantity', quantity);
      let discount = dbProduct.subPoducts[p.style].discount;
      // console.log('discount', discount);
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
    // console.log('uuu');
    // console.error('Ошибка при выполнении Promise.all():', error);
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

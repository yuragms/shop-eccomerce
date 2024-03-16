// import nc from 'next-connect';
import { createRouter } from 'next-connect';
import db from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
// import auth from '../../../middleware/auth';

// const handler = nc();
// const router = createRouter().use(auth);
const router = createRouter();

// handler.get(async (req, res) => {
router.post(async (req, res) => {
  console.log('work2');
  try {
    db.connectDb();
    const { cart, user_id } = req.body;
    let products = [];

    // let user = await User.findById(req.user);
    let user = await User.findById(user_id);
    console.log('user', user._id);
    let existing_cart = await Cart.findOne({ user: user._id });
    // console.log('existing_cart', existing_cart);
    if (existing_cart) {
      // await existing_cart.remove();
      await Cart.deleteOne({ user: user._id });
      console.log('work3', existing_cart);
      //   await Cart.deleteOne({ user: user._id });
    }
    console.log('cart-user');
    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size).price
      );
      console.log('typeof1', typeof price);
      tempProduct.price =
        subProduct.discount > 0
          ? Number((price - price / Number(subProduct.discount)).toFixed(2))
          : Number(price.toFixed(2));
      products.push(tempProduct);
      // console.log('push', tempProduct);
      // console.log('product.price', tempProduct.price);
      // console.log('typeof2', typeof tempProduct.price);
    }
    // console.log('products', products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].qty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// export default handler;
export default router.handler();

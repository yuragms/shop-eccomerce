// import { getToken } from 'next-auth/jwt';

// export default async (req, res, next) => {
//   const token = await getToken({
//     req,
//     secret: process.env.JWT_SECRET,
//     secureCookie: process.env.NODE_ENV === 'production',
//   });
//   if (token) {
//     //signed
//     req.user = token.sub;
//     next();
//   } else {
//     res.status(401).json({ message: 'Not signed in:' });
//   }
//   res.end();
// };

// выдает ошибку в 3000/checkout при попытке добавления адреса
import { getToken } from 'next-auth/jwt';

export default async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  if (token) {
    req.user = token.sub;
  } else {
    res.status(401).json({ message: 'Not signed in:' });
    res.end();
  }
};

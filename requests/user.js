import axios from 'axios';

export const saveCart = async (cart) => {
  console.log('work');
  try {
    const { data } = await axios.post('/api/user/saveCart', {
      cart,
    });
    console.log('axioswork', data);
    return data;
  } catch (error) {
    // return response.data.error.message;
    error.message;
  }
};

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address,
    });
    console.log('axioswork', data);
    return data;
  } catch (error) {
    // return response.data.error.message;
    // error.message;
    return error.response.data.message;
  }
};

export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put('/api/user/manageAddress', {
      id,
    });
    console.log('axioswork', data);
    return data;
  } catch (error) {
    error.message;
  }
};
export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete('/api/user/manageAddress', {
      params: { id },
    });
    console.log('axioswork-deleteAddress', data);
    return data;
  } catch (error) {
    // error.message;
    return error.response.data.message;
  }
};
// export const applyCoupon = async (coupon) => {
//   try {
//     const { data } = await axios.post('/api/user/applyCoupon', {
//       coupon,
//     });
//     return { ...data, success: true };
//   } catch (error) {
//     return response.data.error.message;
//   }
// };

export const applyCoupon = async (coupon) => {
  const { data } = await axios.post('/api/user/applyCoupon', {
    coupon,
  });
  return data;
};

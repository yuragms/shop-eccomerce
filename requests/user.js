import axios from 'axios';

export const saveCart = async (cart, user_id) => {
  console.log('work');
  try {
    const { data } = await axios.post('/api/user/saveCart', {
      cart,
      user_id,
    });
    console.log('axioswork', data);
    return data;
  } catch (error) {
    // return response.data.error.message;
    error.message;
  }
};

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
    error.message;
  }
};

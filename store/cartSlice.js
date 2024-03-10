import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state) {
      state.cartItems = [];
      // return { ...state.cart, cartItems: [] };
    },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const initialState = {
//   cartItems: [],
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       state.cartItems.push(action.payload);
//     },
//     updateCart(state, action) {
//       state.cartItems = action.payload;
//     },
//     emptyCart(state, action) {
//       state.cartItems = [];
//     },
//   },
// });

// export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

// const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

// export default persistedReducer;

// import { createSlice, nanoid } from '@reduxjs/toolkit';

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: [],
//   reducers: {
//     addTodo: {
//       reducer: (state, action) => {
//         state.push(action.payload);
//       },
//       prepare: (text) => {
//         const id = nanoid();
//         return { payload: { id, text } };
//       },
//     },
//   },
// });

// https://redux-toolkit.js.org/api/createslice

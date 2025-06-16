import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, name, price, type ('event'|'merch'), qty }
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i._id === item._id && i.type === item.type
      );
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      state.total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload._id || i.type !== action.payload.type);
      state.total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
  },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

// Async thunk placeholder
export const fetchCart = () => async () => {};

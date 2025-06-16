import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

// Dummy reducers for placeholder slices
const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    ui: dummyReducer,
    user: dummyReducer,
    cart: cartReducer,
    merchandise: dummyReducer,
    order: dummyReducer,
    events: dummyReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemById: (state, action) => {
      const id = action.payload;
      for (let i = state.items.length - 1; i >= 0; i--) {
        if (state.items[i]?.card?.info?.id === id) {
          state.items.splice(i, 1);
          break;
        }
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItemById, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: [],
  },
  reducers: {
    agregarItem: (state, action) => {
      state.items.push(action.payload);
    },
    limpiarCarrito: (state) => {
      state.items = [];
    },
  },
});

export const { agregarItem, limpiarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitas: [], // array de objetos { id, timestamp }
};

const historialSlice = createSlice({
  name: "historial",
  initialState,
  reducers: {
    agregarVisita: (state, action) => {
      const { id, timestamp } = action.payload;
      state.visitas.push({ id, timestamp });
    },
    setHistorial: (state, action) => {
      state.visitas = action.payload;
    },
    limpiarHistorial: (state) => {
      state.visitas = [];
    },
  },
});

export const { agregarVisita, setHistorial, limpiarHistorial } = historialSlice.actions;
export default historialSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  usuario: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsuario: (state, action) => {
      state.usuario = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.usuario = null;
    },
    actualizarUsuario: (state, action) => {
      if (state.usuario) {
        state.usuario = {
          ...state.usuario,
          ...action.payload,
        };
      }
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
  },
});

export const {
  setToken,
  setUsuario,
  logout,
  actualizarUsuario,
  setCredentials, // ✅ ahora sí podés importarlo
} = authSlice.actions;

export default authSlice.reducer;
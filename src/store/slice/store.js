import { configureStore, combineReducers } from "@reduxjs/toolkit";
import carritoReducer from "./carritoSlice";
import favoritosReducer from "./favoritosSlice";
import historialReducer from "./historialSlice";
import authReducer from "./authSlice";



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "favoritos", "historial", 'carrito'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  favoritos: favoritosReducer,
  historial: historialReducer,
  carrito: carritoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



export const persistor = persistStore(store);
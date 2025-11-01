import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store/slice/store.js';
import { PersistGate } from "redux-persist/integration/react";

// // import { router } from './router.jsx';
// // import { RouterProvider } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>


  </StrictMode>
);

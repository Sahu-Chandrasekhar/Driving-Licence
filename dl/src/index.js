import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store'; // adjust the path accordingly
import App from './App';
import AlertProvider from './alertProvider';


const { store, persistor } = configureStore();
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);



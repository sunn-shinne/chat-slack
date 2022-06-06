import React from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatApiProvider.js';
import AuthApiProvider from './contexts/AuthApiProvider.js';
import ModalApiProvider from './contexts/ModalApiProvider.js';

export default (socket) => (
  <Provider store={store}>
    <AuthApiProvider>
      <ModalApiProvider>
        <ChatApiProvider socket={socket}>
          <App />
        </ChatApiProvider>
      </ModalApiProvider>
    </AuthApiProvider>
  </Provider>
);

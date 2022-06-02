import React from 'react';
import { Provider } from 'react-redux';

import App from './App.js';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatApiProvider.jsx';

export default (socket) => (
  <Provider store={store}>
    <ChatApiProvider socket={socket}>
      <App />
    </ChatApiProvider>
  </Provider>
);

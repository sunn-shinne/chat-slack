import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/App.jsx';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatApiProvider.js';
import AuthApiProvider from './contexts/AuthApiProvider.js';
import ModalApiProvider from './contexts/ModalApiProvider.js';

export default (socket) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AuthApiProvider>
        <ModalApiProvider>
          <ChatApiProvider socket={socket}>
            <App />
          </ChatApiProvider>
        </ModalApiProvider>
      </AuthApiProvider>
    </I18nextProvider>
  </Provider>
);

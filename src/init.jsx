import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/App.jsx';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatApiProvider.js';
import AuthApiProvider from './contexts/AuthApiProvider.js';
import ModalApiProvider from './contexts/ModalApiProvider.js';

const rollbarConfig = {
  accessToken: `${process.env.ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const rollbar = new Rollbar(rollbarConfig);

export default (socket) => (
  <RollbarProvider config={rollbarConfig} instance={rollbar}>
    <ErrorBoundary>
      <StoreProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthApiProvider>
            <ModalApiProvider>
              <ChatApiProvider socket={socket}>
                <App />
              </ChatApiProvider>
            </ModalApiProvider>
          </AuthApiProvider>
        </I18nextProvider>
      </StoreProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = (
  <App />
);

ReactDOM.render(
  app,
  document.getElementById('chat'),
);

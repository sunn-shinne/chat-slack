// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = () => {
  const socket = io();
  const app = init(socket);
  ReactDOM.render(app, document.getElementById('chat'));
};

runApp();

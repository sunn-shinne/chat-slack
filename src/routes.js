// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  getData: () => [host, prefix, 'data'].join('/'),

  mainPage: () => [host, '/'].join(''),
  loginPage: () => [host, 'login'].join('/'),
  signupPage: () => [host, 'signup'].join('/'),
  notFoundPage: () => [host, '*'].join('/'),
};

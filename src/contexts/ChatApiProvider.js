/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { setShowConnectionError } from '../slices/uiSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel } from '../slices/channelsSlice.js';

export const ChatContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      dispatch(setShowConnectionError());
    }
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      dispatch(setShowConnectionError());
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  return (
    <ChatContext.Provider value={{ sendMessage, addNewChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatApiProvider;

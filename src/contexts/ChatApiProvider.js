/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';
import { channelAdded, channelUpdated, channelRemoved } from '../slices/channelsSlice.js';

export const ChatContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      toast.error('Ошибка соединения');
    }
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      toast.error('Ошибка соединения');
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(channelAdded(channel));
  });

  const renameChannel = (data) => socket.emit('renameChannel', data, (response) => {
    if (response.status !== 'ok') {
      toast.error('Ошибка соединения');
    }
  });

  socket.on('renameChannel', (data) => {
    const { id, name } = data;
    dispatch(channelUpdated({ id, changes: { name } }));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      toast.error('Ошибка соединения');
    }
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelRemoved(id));
  });

  const chatApi = {
    sendMessage,
    addNewChannel,
    renameChannel,
    removeChannel,
  };

  return (
    <ChatContext.Provider value={chatApi}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatApiProvider;

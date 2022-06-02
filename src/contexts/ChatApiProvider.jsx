/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { clearFeedback, setFeedback } from '../slices/feedbackSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

export const ChatContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    dispatch(clearFeedback());
    if (response.status !== 'ok') {
      dispatch(setFeedback('disconnected'));
    }
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return (
    <ChatContext.Provider value={{ sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatApiProvider;

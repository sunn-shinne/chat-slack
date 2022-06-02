import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import ChatMessage from './ChatMessage.jsx';

const ChatMessages = ({ channelId }) => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter((item) => item.channelId === channelId);

  const renderMessages = (msgs) => msgs
    .map(({ senderName, text }) => (
      <ChatMessage key={_.uniqueId} senderName={senderName} text={text} />
    ));

  return (
    <div className="chat-messages overflow-auto px-5">
      {renderMessages(currentMessages)}
    </div>
  );
};

export default ChatMessages;

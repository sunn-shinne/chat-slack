import React from 'react';
import _ from 'lodash';
import ChatMessage from './ChatMessage.jsx';

const ChatMessages = ({ messages }) => {
  const renderMessages = (msgs) => msgs
    .map(({ senderName, text }) => (
      <ChatMessage key={_.uniqueId()} senderName={senderName} text={text} />
    ));

  return (
    <div className="chat-messages overflow-auto px-5">
      {renderMessages(messages)}
    </div>
  );
};

export default ChatMessages;

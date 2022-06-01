import React from 'react';

const ChatHeader = ({ name, messageCount }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${name}`}</b>
    </p>
    <span>{`${messageCount} сообщений`}</span>
  </div>
);

export default ChatHeader;

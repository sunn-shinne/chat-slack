import React from 'react';

const ChatMessage = ({ senderName, text }) => (
  <div className="text-break mb-2">
    <b>{senderName}</b>
    {`: ${text}`}
  </div>
);

export default ChatMessage;

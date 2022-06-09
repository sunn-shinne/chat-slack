import React from 'react';
import filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));

const ChatMessage = ({ senderName, text }) => (
  <div className="text-break mb-2">
    <b>{senderName}</b>
    {`: ${filter.clean(text)}`}
  </div>
);

export default ChatMessage;

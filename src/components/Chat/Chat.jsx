import React from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader.jsx';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import ChatMessages from './ChatMessages.jsx';
import ChatInput from './ChatInput.jsx';

const Chat = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);

  const currentMessages = messages.filter((item) => item.channelId === currentChannelId);
  const channelName = channels.find((item) => item.id === currentChannelId)?.name;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader name={channelName} messageCount={currentMessages.length} />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;

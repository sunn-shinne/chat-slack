import React from 'react';
import ChannelsHeader from './ChannelsHeader.jsx';
import ChannelsList from './ChannelsList.jsx';

const Channels = () => (
  <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
    <ChannelsHeader />
    <ChannelsList />
  </div>
);

export default Channels;

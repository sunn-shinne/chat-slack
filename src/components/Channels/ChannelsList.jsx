import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/channelsSlice.js';
import ChannelsListItem from './ChannelsListItem.jsx';

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const renderChannels = () => channels.map(({ id, name, removable }) => (
    <ChannelsListItem
      key={_.uniqueId()}
      id={id}
      name={name}
      removable={removable}
      currentChannelId={currentChannelId}
    />
  ));

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {renderChannels()}
    </ul>
  );
};

export default ChannelsList;

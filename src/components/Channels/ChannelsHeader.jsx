import React from 'react';
import ChannelsAddBtn from './ChannelsAddBtn.jsx';
import useModal from '../../hooks/useModal.js';

const ChannelsHeader = () => {
  const { setModalName } = useModal();
  const openModal = () => setModalName('adding');

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>Каналы</span>
      <ChannelsAddBtn handleClick={openModal} />
    </div>
  );
};

export default ChannelsHeader;

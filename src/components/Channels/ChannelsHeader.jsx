import React from 'react';
import { useTranslation } from 'react-i18next';
import ChannelsAddBtn from './ChannelsAddBtn.jsx';
import useModal from '../../hooks/useModal.js';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const { setModal } = useModal();
  const openAddChannelModal = () => setModal('adding');

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('channels')}</span>
      <ChannelsAddBtn handleClick={openAddChannelModal} />
    </div>
  );
};

export default ChannelsHeader;

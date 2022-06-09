import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useChat from '../../hooks/useChat.js';

const RemoveChannelModal = ({ onClose, isShown, params }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { removeChannel } = useChat();

  const handleRemove = async () => {
    setIsLoading(true);
    removeChannel(params.id);
    toast.success(t('success.channel_removed'));
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      show={isShown('removing')}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove_channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('are_you_sure')}</p>
        <div className="d-flex justify-content-end" aria-label="First group">
          <Button variant="secondary" onClick={onClose} className="me-2">{t('buttons.cancel')}</Button>
          <Button onClick={handleRemove} variant="danger" disabled={isLoading}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

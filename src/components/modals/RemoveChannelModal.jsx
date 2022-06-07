import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useChat from '../../hooks/useChat.js';

const RemoveChannelModal = ({ onClose, isShown, params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { removeChannel } = useChat();

  const handleRemove = async () => {
    setIsLoading(true);
    removeChannel(params.id);
    toast.success('Канал удалён');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      show={isShown('removing')}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end" aria-label="First group">
          <Button variant="secondary" onClick={onClose} className="me-2">Отменить</Button>
          <Button onClick={handleRemove} variant="danger" disabled={isLoading}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

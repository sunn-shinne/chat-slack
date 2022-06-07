import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { selectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat.js';

const RenameChannelModal = ({ onClose, isShown, params }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { renameChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const inputEl = useRef(null);

  const validationSchema = object({
    name: string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { name: params.name },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await validationSchema.validate(values);
        renameChannel({ name: values.name, id: params.id });
        setIsValid(true);
        setErrorMessage(null);
        toast.success('Канал переименован');
        formik.resetForm();
        onClose();
      } catch (e) {
        const [message] = e.errors;
        setErrorMessage(message);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, [inputEl]);

  return (
    <Modal
      show={isShown('renaming')}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="visually-hidden">Новое имя канала</Form.Label>
            <Form.Control
              id="name"
              type="name"
              required
              className={cn('form-control', !isValid && 'is-invalid')}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputEl}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end" aria-label="First group">
            <Button variant="secondary" onClick={onClose} className="me-2">Отменить</Button>
            <Button type="submit" variant="primary" disabled={isLoading}>Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;

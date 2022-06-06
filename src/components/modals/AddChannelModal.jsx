import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { selectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat.js';

const AddChannelModal = ({ onClose, isShown }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addNewChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = object({
    name: string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setIsValid(true);
        await validationSchema.validate(values);
        addNewChannel(values);
        toast.success('Канал создан');
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

  return (
    <Modal
      show={isShown('adding')}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
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

export default AddChannelModal;
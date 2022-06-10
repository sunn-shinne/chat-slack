import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat.js';

const AddChannelModal = ({ onClose, isShown }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { addNewChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const inputEl = useRef(null);

  const validationSchema = object({
    name: string()
      .required(t('errors.required'))
      .min(3, t('errors.min_max'))
      .max(20, t('errors.min_max'))
      .notOneOf(channelsNames, t('errors.not_unique')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setIsValid(true);
        await validationSchema.validate(values);
        addNewChannel(values);
        toast.success(t('success.channel_created'));
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
    inputEl.current.focus();
  }, [inputEl]);

  return (
    <Modal
      show={isShown('adding')}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add_channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="visually-hidden">{t('fields.channel_name')}</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              className={cn('form-control', !isValid && 'is-invalid')}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputEl}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end" aria-label="First group">
            <Button variant="secondary" onClick={onClose} className="me-2">{t('buttons.cancel')}</Button>
            <Button type="submit" variant="primary" disabled={isLoading}>{t('buttons.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

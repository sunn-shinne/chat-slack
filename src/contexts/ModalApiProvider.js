/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import getModal from '../components/modals/index.js';

export const ModalContext = createContext({});

const ModalApiProvider = ({ children }) => {
  const [modalName, setModalName] = useState(null);
  const [modalParams, setModalParams] = useState({});

  const setModal = (name, params = {}) => {
    setModalName(name);
    setModalParams(params);
  };

  const isShown = (name) => modalName === name;

  const renderModal = () => {
    if (!modalName) {
      return null;
    }
    const Modal = getModal(modalName);
    return <Modal onClose={() => setModalName(null)} isShown={isShown} params={modalParams} />;
  };

  const modalApi = {
    setModal,
    renderModal,
  };

  return (
    <ModalContext.Provider value={modalApi}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalApiProvider;

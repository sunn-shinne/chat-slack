/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import getModal from '../components/Modals/index.js';

export const ModalContext = createContext({});

const ModalApiProvider = ({ children }) => {
  const [modalName, setModalName] = useState(null);
  const [modalParams, setModalParams] = useState({});
  const isShown = (name) => modalName === name;

  const setModal = (name, params = {}) => {
    setModalName(name);
    setModalParams(params);
  };

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

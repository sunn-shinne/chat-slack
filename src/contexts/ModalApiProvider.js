/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import getModal from '../components/modals/index.js';

export const ModalContext = createContext({});

const ModalApiProvider = ({ children }) => {
  const [currentModalName, setModalName] = useState(null);

  const isShown = (name) => currentModalName === name;

  const renderModal = () => {
    if (!currentModalName) {
      return null;
    }
    const Modal = getModal(currentModalName);
    return <Modal onClose={() => setModalName(null)} isShown={isShown} />;
  };

  const modalApi = {
    setModalName,
    renderModal,
  };

  return (
    <ModalContext.Provider value={modalApi}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalApiProvider;

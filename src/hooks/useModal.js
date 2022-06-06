import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalApiProvider.js';

const useModal = () => useContext(ModalContext);

export default useModal;

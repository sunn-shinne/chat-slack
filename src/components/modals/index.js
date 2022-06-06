import AddChannelModal from './AddChannelModal.jsx';

const modals = {
  adding: AddChannelModal,
};

export default (modalName) => modals[modalName];

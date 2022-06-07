import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const modals = {
  adding: AddChannelModal,
  renaming: RenameChannelModal,
  removing: RemoveChannelModal,
};

export default (modalName) => modals[modalName];

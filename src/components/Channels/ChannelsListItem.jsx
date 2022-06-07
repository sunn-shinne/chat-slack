import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useModal from '../../hooks/useModal.js';
import { setCurrentChannel } from '../../slices/uiSlice.js';

const ChannelsListItem = ({
  id,
  name,
  removable,
  currentChannelId,
}) => {
  const dispatch = useDispatch();

  const btnClass = 'w-100 rounded-0 text-start';
  const buttonVariant = currentChannelId === id ? 'secondary' : 'light';
  const chooseChannel = () => dispatch(setCurrentChannel(id));

  const { setModal } = useModal();
  const openRenameChannelModal = () => setModal('renaming', { name, id });
  const openRemoveChannelModal = () => setModal('removing', { id });

  const channelBtn = (
    <Button className={btnClass} variant={buttonVariant} onClick={chooseChannel}>
      <span># </span>
      {name}
    </Button>
  );

  return (
    <li className="nav-item w-100" key={id}>
      {
        removable
          ? (
            <Dropdown as={ButtonGroup} className="d-flex">
              {channelBtn}
              <Dropdown.Toggle split variant={buttonVariant} />
              <Dropdown.Menu>
                <Dropdown.Item onClick={openRemoveChannelModal}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={openRenameChannelModal}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : channelBtn
      }
    </li>
  );
};

export default ChannelsListItem;

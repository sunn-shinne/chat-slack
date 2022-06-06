import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
  const handleClick = () => dispatch(setCurrentChannel(id));

  const channelBtn = (
    <Button className={btnClass} variant={buttonVariant} onClick={handleClick}>
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
                <Dropdown.Item>Удалить</Dropdown.Item>
                <Dropdown.Item>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : channelBtn
      }
    </li>
  );
};

export default ChannelsListItem;

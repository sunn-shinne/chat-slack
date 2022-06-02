import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import SendButton from './ChatSendButton.jsx';
import useChat from '../../hooks/useChat.js';

const ChatInput = () => {
  const [text, setText] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { sendMessage } = useChat();

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({
      channelId: currentChannelId,
      senderName: localStorage.getItem('username'),
      text,
    });
    setText('');
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              onChange={handleChange}
              value={text}
            />
            <SendButton
              isDisabled={text.length === 0}
            />
          </InputGroup>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatInput;

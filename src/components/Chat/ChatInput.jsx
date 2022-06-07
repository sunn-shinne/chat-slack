import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import SendButton from './ChatSendButton.jsx';
import useChat from '../../hooks/useChat.js';
import useAuth from '../../hooks/useAuth.js';

const ChatInput = () => {
  const [text, setText] = useState('');
  const { currentChannelId } = useSelector((state) => state.ui);
  const { getUsername } = useAuth();
  const { sendMessage } = useChat();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({
      channelId: currentChannelId,
      senderName: getUsername(),
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
              ref={inputEl}
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

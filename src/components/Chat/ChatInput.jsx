import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import SendButton from './ChatSendButton.jsx';

const ChatInput = () => {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" noValidate autoComplete="off">
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
              handleClick={() => console.log('send')}
              isDisabled={text.length === 0}
            />
          </InputGroup>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatInput;

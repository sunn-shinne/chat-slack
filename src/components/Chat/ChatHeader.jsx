import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ name, messageCount }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span>{t('messages.messages', { count: messageCount })}</span>
    </div>
  );
};

export default ChatHeader;

import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatApiProvider.js';

const useChat = () => useContext(ChatContext);

export default useChat;

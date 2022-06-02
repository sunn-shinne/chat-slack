import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatApiProvider.jsx';

const useChat = () => useContext(ChatContext);

export default useChat;

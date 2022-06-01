import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import Chat from '../components/Chat/Chat.jsx';
import Channels from '../components/Channels/Channels.jsx';

import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await axiosInstance.get(routes.getData());
      const channels = {
        entities: data.channels,
        ids: Object.keys(data.channels),
        currentChannelId: data.currentChannelId,
      };
      const messages = {
        entities: data.messages,
        ids: Object.keys(data.messages),
      };
      dispatch(setChannels(channels));
      dispatch(setMessages(messages));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const content = isLoading
    ? <div className="card-body"><p className="card-title">Loading</p></div>
    : (
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </div>
    );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {content}
    </div>
  );
};

export default Main;

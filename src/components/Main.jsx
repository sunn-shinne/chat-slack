import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import Chat from './Chat/Chat.jsx';
import Channels from './Channels/Channels.jsx';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import { setCurrentChannel } from '../slices/uiSlice.js';

const normolizeData = (data) => {
  const normolizedData = {
    entities: data.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {}),
    ids: data.map((item) => item.id),
  };
  return normolizedData;
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(routes.getData(), { headers: getAuthHeader() });
        const channels = normolizeData(data.channels);
        const messages = normolizeData(data.messages);
        dispatch(setChannels(channels));
        dispatch(setMessages(messages));
        dispatch(setCurrentChannel(data.currentChannelId));
        setIsLoading(false);
      } catch (e) {
        toast.error(t('errors.connection'));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {
        isLoading
          ? <div className="card-body"><p className="card-title">Loading</p></div>
          : (
            <div className="row h-100 bg-white flex-md-row">
              <Channels />
              <Chat />
            </div>
          )
      }
    </div>
  );
};

export default Main;

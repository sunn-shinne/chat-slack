import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthApiProvider.js';

const useAuth = () => useContext(AuthContext);

export default useAuth;

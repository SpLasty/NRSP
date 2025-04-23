import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from '../../services/authService';
import { setAuthInitialised, setCredentials } from './authSlice';

export default function BootstrapAuth() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        dispatch(setAuthInitialised());
        return;
      }
  
      getProfile()
        .then(user => {
          dispatch(setCredentials(user));   // small helper reducer
        })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => dispatch(setAuthInitialised()));
    }, [dispatch]);
  
    return null;
  }
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from '../../services/authService';
import { loginUser } from './authSlice';

export default function BootstrapAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

 
    getProfile()
      .then(user => {
        dispatch(
          loginUser.fulfilled(
            user,            
            '',              
            { email: '', password: '' } as any 
          )
        );
      })
      .catch(() => {
        // token invalid / expired → clean up
        localStorage.removeItem('token');
      });
  }, [dispatch]);

  return null; // this component doesn't render anything
}
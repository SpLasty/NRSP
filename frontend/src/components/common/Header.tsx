import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useQueryClient } from '@tanstack/react-query';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear(); 
    navigate('/login');
  };
  
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ ml: 28 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleLogout} size="small">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

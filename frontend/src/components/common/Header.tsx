import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { logout } = useAuth();
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ ml: 28 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={logout} size="small">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
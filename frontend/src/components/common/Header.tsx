import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clear cookies (client-side only)
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });

    // Clear localStorage & sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Call your app's logout logic
    logout();

    // Optional: Reload page or redirect to login
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ ml: 28 }}>
      <Toolbar sx={{ justifyContent: 'flex' }}>
        <Button variant="contained" color="primary" onClick={handleLogout} size="small">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

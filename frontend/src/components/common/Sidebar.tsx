import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';

export type Role = 'borrower' | 'lender' | 'admin';

const navByRole: Record<Role, Array<{ label: string; path: string; icon: React.ReactNode }>> = {
  borrower: [
    { label: 'Home', path: '/borrower', icon: <HomeIcon /> },
    { label: 'Search Items', path: '/borrower/search', icon: <SearchIcon /> },
    { label: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
    { label: 'Profile', path: '/profile', icon: <AccountCircleIcon /> },
  ],
  lender: [
    { label: 'Home', path: '/lender', icon: <HomeIcon /> },
    { label: 'My Listings', path: '/lender/my-items', icon: <ListIcon /> },
    { label: 'List New Item', path: '/lender/list', icon: <AddIcon /> },
    { label: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
    { label: 'Profile', path: '/profile', icon: <AccountCircleIcon /> },
  ],  
  admin: [
    { label: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
    { label: 'Users', path: '/admin/users', icon: <ListIcon /> },
    { label: 'Listings', path: '/admin/listings', icon: <ListIcon /> },
    { label: 'Reports', path: '/admin/reports', icon: <ListIcon /> },
  ],
};

export const Sidebar: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const role = user?.role as Role; 
  const location = useLocation();

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List sx={{ pt: 0 }}>
        {navByRole[role]?.map(({ label, path, icon }) => (
          <ListItemButton key={path} component={Link} to={path} selected={location.pathname === path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
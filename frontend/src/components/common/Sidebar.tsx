import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Box, Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';
import {
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { drawerWidth } from '../../theme/theme';


export type Role = 'borrower' | 'lender' | 'admin';

type NavItem = { label: string; path: string; icon: React.ReactNode };



const navByRole: Record<Role, NavItem[]> = {
  borrower: [
    { label: 'Home', path: '/borrower',           icon: <HomeIcon /> },
    { label: 'Search Items', path: '/borrower/search', icon: <SearchIcon /> },
    { label: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
    { label: 'Profile', path: '/profile',         icon: <AccountIcon /> },
    { label: 'History', path: '/borrower/history', icon: <HistoryIcon /> },
  ],
  lender: [
    { label: 'Home', path: '/lender',             icon: <HomeIcon /> },
    { label: 'My Listings', path: '/lender/my-items', icon: <ListIcon /> },
    { label: 'List New Item', path: '/lender/list',   icon: <AddIcon /> },
    { label: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
    { label: 'Profile', path: '/profile',         icon: <AccountIcon /> },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin',             icon: <DashboardIcon /> },
    { label: 'Users', path: '/admin/users',           icon: <ListIcon /> },
    { label: 'Listings', path: '/admin/listings',     icon: <ListIcon /> },
    { label: 'Reports', path: '/admin/reports',       icon: <ListIcon /> },
  ],
};


export const Sidebar: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const role      = (user?.role ?? 'borrower') as Role;  
  const location  = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />

      {/* Brand box: initials + role */}
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'rgba(0,0,0,0.12)',
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 600,
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          {user?.name?.[0] ?? 'U'}
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {role}
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ pt: 0 }}>
        {navByRole[role].map(({ label, path, icon }) => (
          <ListItemButton
            key={path}
            component={Link}
            to={path}
            selected={location.pathname === path}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

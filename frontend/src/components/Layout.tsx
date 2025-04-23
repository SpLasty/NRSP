import React from 'react'
import { Box, Toolbar } from '@mui/material'
import { Sidebar } from './common/Sidebar'
import { Header } from './common/Header'
import { Outlet } from 'react-router-dom'


export const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Toolbar />     
        <Outlet />
      </Box>
    </Box>
  );
};

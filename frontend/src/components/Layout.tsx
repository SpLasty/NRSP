import React from 'react'
import { Box, Toolbar } from '@mui/material'
import { Sidebar } from './common/Sidebar'
import { Header } from './common/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'

export const Layout: React.FC = () => {
  const { user } = useSelector(selectAuth)
  const role = user?.role
  if (!role) return null
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box component="main" sx={{ flexGrow: 1, p: 2, ml: '220px' }}>
        <Header />
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
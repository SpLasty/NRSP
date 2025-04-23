import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../features/auth/authSlice'
import { CircularProgress, Box } from '@mui/material' 

export const ProtectedRoute: React.FC = () => {
  const { user, initialised } = useSelector(selectAuth)
  
  if (!initialised) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../features/auth/authSlice'

export const ProtectedRoute: React.FC = () => {
  const { user } = useSelector(selectAuth)
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
import React, { useState, useEffect } from 'react'
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectAuth } from '../../features/auth/authSlice'
import type { AppDispatch } from '../../app/store'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector(selectAuth)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) navigate(`/${user.role}`)
  }, [user, navigate])

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" mb={2} align="center">
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField label="Email" type="email" required size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" required size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </Button>
      </Box>
    </Container>
  )
}

export default LoginPage
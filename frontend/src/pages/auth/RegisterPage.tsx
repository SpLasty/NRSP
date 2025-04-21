import React, { useState, useEffect } from 'react'
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, selectAuth } from '../../features/auth/authSlice'
import type { AppDispatch } from '../../app/store'

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'borrower' | 'lender'>('borrower')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector(selectAuth)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password, role }))
  }

  useEffect(() => {
    if (user) navigate(`/${user.role}`)
  }, [user, navigate])

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" mb={2} align="center">
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField label="Name" required size="small" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" type="email" required size="small" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" required size="small" value={password} onChange={e => setPassword(e.target.value)} />
        <TextField
          select
          label="Role"
          size="small"
          value={role}
          onChange={e => setRole(e.target.value as 'borrower' | 'lender')}
          SelectProps={{ native: true }}
        >
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </TextField>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </Button>
      </Box>
    </Container>
  )
}

export default RegisterPage
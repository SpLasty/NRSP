import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, CircularProgress
} from '@mui/material';
import { getUserIdFromToken } from '../../utils/auth';

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized or failed request');

        const data = await res.json();
        setUser(data);
        setForm({ name: data.name, email: data.email, password: '' });
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Profile updated!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />

        <TextField
          label="New Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          placeholder="Leave blank to keep current password"
        />

        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ mt: 3 }}
        >
          Update Profile
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfilePage;

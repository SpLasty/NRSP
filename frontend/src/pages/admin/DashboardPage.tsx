import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface BorrowRequest {
  borrower?: {
    name: string;
  };
  returnDueDate?: string;
}

interface Listing {
  id: number;
  title: string;
  status: string;
  lender: { name: string };
  borrowRequests: BorrowRequest[];
}

const DashBoardPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchListings = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/listings');
      if (!res.ok) throw new Error('Failed to fetch listings');

      const data = await res.json();
      if (Array.isArray(data)) {
        setListings(data);
      } else {
        setListings([]);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setListings([]);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert('Failed to delete user.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleDeleteListing = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/items/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setListings(listings.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete listing.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard – Users
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeleteUser(user.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom>
        All Listings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Lender</strong></TableCell>
              <TableCell><strong>Borrower</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Return Due</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((item) => {
              const latestReq = item.borrowRequests?.[item.borrowRequests.length - 1];
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.lender?.name}</TableCell>
                  <TableCell>{latestReq?.borrower?.name || '—'}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{latestReq?.returnDueDate || '—'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteListing(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {listings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashBoardPage;

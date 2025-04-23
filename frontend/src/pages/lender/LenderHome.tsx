import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';

interface Item {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  condition: string;
  category?: string;
}

interface Borrower {
  id: number;
  name: string;
  email: string;
}

interface BorrowRequest {
  id: number;
  status: 'pending' | 'accepted' | 'declined' | 'returned';
  returnDueDate: string;
  requestDate: string;
  item: Item;
  borrower: Borrower;
}

const LenderHome: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:3000/lender/requests/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch lender requests');
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []); // Safely handle unexpected data
      } catch (err) {
        console.error('Error fetching lender requests:', err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleApprove = async (requestId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/borrow/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'accepted' } : req
        )
      );
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request.');
    }
  };

  if (!user) return <Typography>Loading user...</Typography>;
  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Borrow Requests for Your Items
      </Typography>

      {requests.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No borrow requests yet.
        </Typography>
      ) : (
        requests.map((req) => (
          <Card key={req.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{req.item.title}</Typography>
              {req.item.description && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {req.item.description}
                </Typography>
              )}
              <Typography variant="body2">
                <strong>Status:</strong> {req.status}
              </Typography>
              <Typography variant="body2">
                <strong>Return Due:</strong> {req.returnDueDate}
              </Typography>
              <Typography variant="body2">
                <strong>Borrower:</strong> {req.borrower.name} ({req.borrower.email})
              </Typography>
            </CardContent>
            {req.status === 'pending' && (
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleApprove(req.id)}
                >
                  Approve
                </Button>
              </CardActions>
            )}
            <Divider />
          </Card>
        ))
      )}
    </Box>
  );
};

export default LenderHome;

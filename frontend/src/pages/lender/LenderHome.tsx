import { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardActions, Typography, Button, Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';
import {
  fetchLenderRequests, setRequestStatus, BorrowRequest,
} from '../../services/borrowRequestService';

export default function LenderHome() {
  const { user } = useSelector(selectAuth);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetchLenderRequests(user.id).then(setRequests);
  }, [user]);

  const decide = async (id: number, status: 'accepted' | 'declined') => {
    await setRequestStatus(id, status);
    setRequests(r => r.map(q => (q.id === id ? { ...q, status } : q)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Incoming Borrow Requests</Typography>

      {requests.map(req => (
        <Card key={req.id} sx={{ mb: 2, backdropFilter: 'blur(4px)', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{req.item.title}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {req.item.description}
            </Typography>

            <Chip
              size="small"
              label={req.status.toUpperCase()}
              color={
                req.status === 'pending' ? 'warning'
                : req.status === 'accepted' ? 'success'
                : 'error'
              }
              sx={{ mt: 1 }}
            />

            <Typography variant="caption" display="block">
              Borrower: {req.borrower?.name} ({req.borrower?.email})
            </Typography>
            <Typography variant="caption" display="block">
              Due: {req.returnDueDate}
            </Typography>
          </CardContent>

          {req.status === 'pending' && (
            <CardActions>
              <Button size="small" variant="contained"
                onClick={() => decide(req.id, 'accepted')}>
                Approve
              </Button>
              <Button size="small" color="error"
                onClick={() => decide(req.id, 'declined')}>
                Decline
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </Box>
  );
}

import { useEffect, useState } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';
import { fetchBorrowerRequests, BorrowRequest } from '../../services/borrowRequestService';

export default function BorrowerHistoryPage() {
  const { user } = useSelector(selectAuth);
  const [history, setHistory] = useState<BorrowRequest[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetchBorrowerRequests(user.id, 'all').then(rs =>
      setHistory(rs.filter(r => r.status !== 'pending')),
    );
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Past Requests</Typography>

      {history.map(r => (
        <Box key={r.id} sx={{ mb: 3 }}>
          <Typography variant="h6">{r.item.title}</Typography>
          <Chip
            label={r.status.toUpperCase()}
            size="small"
            color={r.status === 'accepted' ? 'success'
                  : r.status === 'declined' ? 'error'
                  : 'info'}
          />
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

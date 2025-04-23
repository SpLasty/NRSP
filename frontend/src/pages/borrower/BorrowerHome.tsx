
import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';

interface BorrowedItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  condition: string;
}

interface BorrowRequest {
  id: number;
  status: 'pending' | 'accepted' | 'declined' | 'returned';
  requestDate: string;
  returnDueDate: string;
  item: BorrowedItem;
}


const BorrowerHome: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return; // wait for user info

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:3000/borrow/user/${user.id}`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (!user) return <Typography>Loading user...</Typography>;
  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Borrow Requests
      </Typography>

      {requests.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          You haven't requested any items yet.
        </Typography>
      )}

      {requests.map((req) => (
        <Box key={req.id} sx={{ mb: 4 }}>
          {req.item.imageUrl && (
            <img
              src={req.item.imageUrl}
              alt={req.item.title}
              style={{ width: '100%', maxWidth: 300, height: 200, objectFit: 'cover', borderRadius: 8 }}
            />
          )}
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6">{req.item.title}</Typography>
            <Typography variant="body2">{req.item.description}</Typography>
            <Typography variant="caption" display="block">
              Category: {req.item.category} | Condition: {req.item.condition}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Status:</strong> {req.status}
            </Typography>
            <Typography variant="body2">
              <strong>Requested On:</strong> {new Date(req.requestDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Return Due:</strong> {req.returnDueDate}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default BorrowerHome;

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { getUserIdFromToken, getUserRoleFromToken } from '../../utils/auth';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';

<<<<<<< Updated upstream



=======
const role = getUserRoleFromToken();
const isBorrower = role === 'borrower';
>>>>>>> Stashed changes

interface Item {
  id: number;
  title: string;
  description: string;
  condition: string;
  category: string;
  status: string;
  imageUrl: string | null;
  location: { lat: number; lng: number } | null;
}

const ItemDetailPage: React.FC = () => {
  const { user } = useSelector(selectAuth);   // ← reactive
  const isBorrower = user?.role === 'borrower';
  
  console.log(getUserRoleFromToken())
  console.log(isBorrower)

  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [returnDueDate, setReturnDueDate] = useState('');
  const borrowerId = getUserIdFromToken();
  const mapRef = useRef<HTMLDivElement>(null);

  const MAP_ID = '2e3d7acc77ffe0b5'; // 🔥 Replace this with your actual Google Cloud Map ID

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:3000/items/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error('Failed to fetch item:', err);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    const initMap = async () => {
      if (!item?.location || !mapRef.current) return;

      const { Loader } = await import('@googlemaps/js-api-loader');
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['marker'],
      });

      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      const map = new Map(mapRef.current, {
        center: item.location,
        zoom: 17,
        mapId: MAP_ID, // ✅ Use mapId here
        tilt: 45,
        heading: 90,
        mapTypeId: 'roadmap',
      });

      new AdvancedMarkerElement({
        map,
        position: item.location,
        title: item.title,
      });
    };

    initMap();
  }, [item]);

  const handleSubmit = async () => {
    if (!item || !item.id || !borrowerId || !returnDueDate) {
      alert('Missing required fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          borrowerId,
          returnDueDate,
        }),
      });

      if (!res.ok) throw new Error('Failed to create request');
      setOpen(false);
      alert('Borrow request submitted!');
    } catch (err) {
      console.error('Error submitting borrow request:', err);
      alert('Something went wrong.');
    }
  };

  if (!item) return <Typography>Loading item...</Typography>;

  return (
    <Box sx={{ px: 3, py: 4, maxWidth: 600, mx: 'auto' }}>
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 8 }}
        />
      )}

      <Typography variant="h4" sx={{ mt: 3 }}>{item.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>{item.description}</Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2"><strong>Condition:</strong> {item.condition}</Typography>
        <Typography variant="body2"><strong>Category:</strong> {item.category}</Typography>
        <Typography variant="body2"><strong>Status:</strong> {item.status}</Typography>
        {item.location && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Location:</strong> {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
          </Typography>
        )}
      </Box>

      {/* Google Map */}
      {item.location && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Map Location</Typography>
          <div ref={mapRef} style={{ width: '100%', height: 300, borderRadius: 8 }} />
        </Box>
      )}

      {/* Borrow Button and Dialog */}
      {isBorrower && (
        <>
          <Button variant="contained" sx={{ mt: 4 }} onClick={() => setOpen(true)}>
            Request to Borrow
          </Button>

          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Request to Borrow</DialogTitle>
            <DialogContent>
              <TextField
                label="Return Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={returnDueDate}
                onChange={(e) => setReturnDueDate(e.target.value)}
                sx={{ mt: 1 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!returnDueDate || !item}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ItemDetailPage;

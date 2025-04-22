import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Autocomplete, Divider } from '@mui/material';

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

const SearchItemsPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };

    fetchItems();
  }, []);

  const itemNames = items.map((item) => item.title);
  const filteredItems = query
    ? items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Autocomplete
        freeSolo
        options={itemNames}
        onInputChange={(_, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search items"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
          />
        )}
      />

      {filteredItems.map((item) => (
        <Box key={item.id} sx={{ mb: 4 }}>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: '100%', maxWidth: 300, height: 200, objectFit: 'cover', borderRadius: 8 }}
            />
          )}
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="caption" display="block">
              Condition: {item.condition} | Category: {item.category} | Status: {item.status}
            </Typography>
            {item.location && (
              <Typography variant="caption" color="text.secondary">
                Location: {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default SearchItemsPage;

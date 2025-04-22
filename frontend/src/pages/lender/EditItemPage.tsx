// pages/lender/EditItemPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { ItemForm } from '../../components/ItemForm';
import { fetchItemById, updateItem, ItemPayload } from '../../services/itemService';

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const item = await fetchItemById(Number(id));
        setInitialValues({
          title: item.title,
          description: item.description,
          condition: item.condition,
          category: item.category,
          imageUrl: item.imageUrl,
          lat: item.location.lat.toString(),
          lng: item.location.lng.toString(),
          address: item.location.address || '',
        });
      } catch (err) {
        setError('Failed to fetch item.');
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleSubmit = async (data: ItemPayload) => {
    try {
      await updateItem(Number(id), data);
      navigate('/lender/list'); // redirect after update
    } catch (err) {
      setError('Failed to update item.');
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Edit Item</Typography>
      <ItemForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Update Item"
      />
    </Box>
  );
};

export default EditItemPage;

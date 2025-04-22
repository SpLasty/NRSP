import React, { useState } from 'react';
import {
  Box, TextField, Button, MenuItem, Typography, Alert, Stack, Avatar,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  createItem, uploadImage, ItemPayload, Item,
} from '../../services/itemService';

type Condition = 'new' | 'good' | 'fair' | 'poor';
const conditionOptions: Condition[] = ['new', 'good', 'fair', 'poor'];

interface FormState extends ItemPayload {
  lat: string;          
  lng: string;
  address?: string;
}

export default function ListItemsPage() {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    condition: 'good',
    category: '',
    imageUrl: '',
    lat: '',
    lng: '',
    address: '',
  });
  const [file, setFile] = useState<File | null>(null);


  const {
    mutate: create,
    isPending,
    isSuccess,
    error,
  } = useMutation<Item, Error, ItemPayload>({
    mutationFn: createItem,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | undefined;
    if (file) {
      const res = await uploadImage(file);   
      imageUrl = res.url;
    }

    const {
      title, condition, description, category,
      lat, lng, address,
    } = form;

    const payload: ItemPayload & { location: { lat: number; lng: number; address?: string } } = {
      title,
      condition,
      location: { lat: +lat, lng: +lng, ...(address && { address }) },
      ...(description && { description }),
      ...(category && { category }),
      ...(imageUrl && { imageUrl }),
    };

    create(payload);                       
  };


  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>List a New Item</Typography>

      {isSuccess && <Alert severity="success">Item listed!</Alert>}
      {error && <Alert severity="error">{error.message}</Alert>}

      <Box component="form" onSubmit={onSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField label="Title" name="title" required size="small"
                   value={form.title} onChange={onChange} />

        <TextField label="Description" name="description" multiline rows={3} size="small"
                   value={form.description} onChange={onChange} />

        <TextField select label="Condition" name="condition" size="small"
                   value={form.condition} onChange={onChange}>
          {conditionOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField label="Category" name="category" size="small"
                   value={form.category} onChange={onChange} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="outlined" component="label">
            Choose Image
            <input hidden type="file" accept="image/*" onChange={handleFile}/>
          </Button>
          {file && (
            <Avatar
              variant="rounded"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56 }}
            />
          )}
        </Stack>

        <TextField label="Latitude"  name="lat" type="number" required
                   value={form.lat} onChange={onChange} />

        <TextField label="Longitude" name="lng" type="number" required
                   value={form.lng} onChange={onChange} />

        <TextField label="Address" name="address"
                   value={form.address} onChange={onChange} />

        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Saving…' : 'List Item'}
        </Button>
      </Box>
    </Box>
  );
}

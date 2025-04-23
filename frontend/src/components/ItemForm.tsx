import React, { useState } from 'react';
import {
  Box, TextField, Button, MenuItem, Stack, Avatar,
} from '@mui/material';
import { ItemPayload, uploadImage } from '../services/itemService';

type Condition = 'new' | 'good' | 'fair' | 'poor';
const conditionOptions: Condition[] = ['new', 'good', 'fair', 'poor'];

interface FormProps {
  initialValues?: Partial<ItemPayload & { lat: string; lng: string }>;
  onSubmit: (data: ItemPayload) => void;
  submitLabel?: string;
}

export const ItemForm: React.FC<FormProps> = ({
  initialValues = {},
  onSubmit,
  submitLabel = 'Submit',
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    condition: 'good',
    category: '',
    imageUrl: '',
    lat: '',
    lng: '',
    address: '',
    ...initialValues,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = form.imageUrl;
    if (file) {
      const res = await uploadImage(file);
      imageUrl = res.url;
      setForm(prev => ({ ...prev, imageUrl })); 
    }

    const payload: ItemPayload = {
      title: form.title,
      condition: form.condition as any,
      category: form.category,
      description: form.description,
      imageUrl,
      location: {
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        address: form.address,
      },
    };

    onSubmit(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
      <TextField select label="Condition" name="condition" value={form.condition} onChange={handleChange}>
        {conditionOptions.map(opt => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </TextField>
      <TextField label="Category" name="category" value={form.category} onChange={handleChange} />
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="outlined" component="label">
          Choose Image
          <input hidden type="file" accept="image/*" onChange={handleFile} />
        </Button>
        {file
          ? <Avatar variant="rounded" src={URL.createObjectURL(file)} sx={{ width: 56, height: 56 }} />
          : form.imageUrl && <Avatar variant="rounded" src={form.imageUrl} sx={{ width: 56, height: 56 }} />
        }
      </Stack>
      <TextField label="Latitude" name="lat" type="number" value={form.lat} onChange={handleChange} required />
      <TextField label="Longitude" name="lng" type="number" value={form.lng} onChange={handleChange} required />
      <TextField label="Address" name="address" value={form.address} onChange={handleChange} />
      <Button type="submit" variant="contained">{submitLabel}</Button>
    </Box>
  );
};

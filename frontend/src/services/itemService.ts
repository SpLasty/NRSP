import api from './api';

export type ItemCondition = 'new' | 'good' | 'fair' | 'poor';
export type ItemStatus = 'pending' | 'approved' | 'borrowed' | 'returned';

export interface Item {
  id: number;
  title: string;
  description?: string;
  condition: ItemCondition;
  category?: string;
  imageUrl?: string;
  status: ItemStatus;
  createdAt: string; 
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  lender: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ItemPayload {
  title: string;
  condition: ItemCondition;
  description?: string;
  category?: string;
  imageUrl?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
}

export const fetchMyItems = (): Promise<Item[]> =>
  api.get<Item[]>('/items/users/me/items').then(res => res.data);


export const createItem = (data: ItemPayload): Promise<Item> =>
  api.post<Item>('/items', data).then(res => res.data);

export const uploadImage = (file: File): Promise<{ url: string }> => {
  const form = new FormData();
  form.append('file', file);

  return api.post('/items/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => {
    // Ensure URL includes the full API base path
    const url = res.data.url.startsWith('http') 
      ? res.data.url 
      : `${import.meta.env.VITE_API_URL}${res.data.url}`;
    return { url };
  });
};
export async function fetchItemById(id: number): Promise<Item> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`);
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
}

export async function updateItem(id: number, payload: ItemPayload): Promise<Item> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}



export const deleteItem = (id: number): Promise<void> =>
    api.delete(`/items/${id}`).then(() => undefined);
  


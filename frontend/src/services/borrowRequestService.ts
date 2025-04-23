import api from './api';
import { Item } from './itemService';

export interface BorrowRequest {
  id: number;
  status: 'pending' | 'accepted' | 'declined' | 'returned';
  requestDate: string;
  returnDueDate: string;
  item: Item;
  borrower?: { id: number; name: string; email: string };
}

export const fetchLenderRequests = (lenderId: number) =>
  api.get<BorrowRequest[]>(`/borrow/lender/${lenderId}`).then(r => r.data);

export const fetchBorrowerRequests = (
  borrowerId: number,
  status: 'pending' | 'accepted' | 'declined' | 'returned' | 'all' = 'all',
) =>
  api
    .get<BorrowRequest[]>(`/borrow/user/${borrowerId}`, { params: { status } })
    .then(r => r.data);

export const setRequestStatus = (id: number, status: string) =>
  api.patch(`/borrow/${id}/status`, { status });
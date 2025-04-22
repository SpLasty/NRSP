import {jwtDecode} from 'jwt-decode';

export function getUserIdFromToken(): number | null {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub || null;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

export function getUserRoleFromToken(): 'borrower' | 'lender' | 'admin' | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
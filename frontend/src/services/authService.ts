import api from './api'

export interface UserProfile {
  id: number
  email: string
  role: 'borrower' | 'lender' | 'admin'
  name: string
  location?: string
}

export const register = (data: {
  name: string
  email: string
  password: string
  role: UserProfile['role']
  location?: string
}) => api.post('/auth/register', data)

export const login = (email: string, password: string) => 
  api.post<{ access_token: string }>('/auth/login', { email, password })
    .then(res => {
      localStorage.setItem('token', res.data.access_token);
    });

export const getProfile = () =>
  api.get<UserProfile>('/auth/profile').then(r => r.data)

export const logout = () => {
  localStorage.removeItem('token')
}
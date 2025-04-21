import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import BorrowerHome from '../pages/borrower/BorrowerHome';
import SearchItemsPage from '../pages/borrower/SearchItemsPage';
import ItemDetailPage from '../pages/borrower/ItemDetailPage';
import LenderHome from '../pages/lender/LenderHome'
import ListItemsPage from '../pages/lender/ListItemsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* protected area */}
    <Route element={<ProtectedRoute />}> 
      <Route element={<Layout />}>
        {/* Borrower */}
        <Route path="borrower" element={<BorrowerHome />} />
        <Route path="borrower/search" element={<SearchItemsPage />} />
        <Route path="borrower/item/:id" element={<ItemDetailPage />} />
        {/* Lender */}
        <Route path="lender" element={<LenderHome />} />
        <Route path="lender/list" element={<ListItemsPage />} />
        {/* fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useAuth();
  if (!user || (roles.length && !roles.includes(user.role))) {
    return <Navigate to="/login" />;
  }
  return children;
};
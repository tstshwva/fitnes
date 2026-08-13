/**
 * Component: RoleProtectedRoute
 * Guards routes based on authentication state and allowed roles ('student' | 'instructor').
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <p>Cargando sesión y permisos...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to their respective authorized home
    const redirectPath = role === 'instructor' ? '/admin/dashboard' : '/app/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

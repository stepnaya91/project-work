import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { tokenSelectors } from '../../store/slices/token';

export type ProtectedRouteProps = {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector(tokenSelectors.get);
  const location = useLocation();
  if (token) return <>{children}</>;
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

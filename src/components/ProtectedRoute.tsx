import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  requiredRole?: 'user' | 'admin';
  userRole?: 'user' | 'admin' | null;
  redirectTo?: string;
}

/**
 * Route protection wrapper for sensitive or admin routes.
 * 
 * NOTE: For full security, client-side route guards MUST be paired with
 * server-side API authorization (JWT/session cookie verification in HTTP-only cookies).
 * Never trust client-side state alone to protect sensitive data or actions.
 */
export function ProtectedRoute({
  children,
  isAuthenticated,
  requiredRole = 'admin',
  userRole = null,
  redirectTo = '/404',
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users without exposing route existence
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Insufficient permissions
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

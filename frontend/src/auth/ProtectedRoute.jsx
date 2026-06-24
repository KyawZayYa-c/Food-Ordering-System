import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../lib/features/auth/authApiSlice';

const ProtectedRoute = ({ allowedRole }) => {
  const { data: response, isLoading, isError } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response || !response.success) {
      return <Navigate to="/login" replace />; 
  }
  
  const userRole = response.data?.role; 
  
  if (allowedRole && userRole !== allowedRole) {
      return userRole === 'admin' ? <Navigate to="/dashboard/products" replace /> : <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
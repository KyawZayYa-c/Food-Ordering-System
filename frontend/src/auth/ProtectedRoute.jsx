import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../../lib/features/auth/authApiSlice';

const ProtectedRoute = ({ allowedRole }) => {
  const { data: response, isLoading, isError } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response || !response.success) {
      return <Navigate to="/login" replace />; 
  }
  
  const userRole = response.data?.role; 
console.log('user role : ', userRole);
  if (allowedRole && userRole !== allowedRole) {
      return userRole === 'admin' ? <Navigate to="/dashboard/overviews" replace /> : <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * Wraps routes requiring authentication.
 * - If not logged in → redirect to /login
 * - If requireAdmin and not admin → redirect to /dashboard
 * - If requireDemographics and not completed → redirect to /demographics
 */
const ProtectedRoute = ({ children, requireAdmin = false, requireDemographics = true }) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireDemographics && !user.demographicsCompleted && location.pathname !== '/demographics') {
    return <Navigate to="/demographics" replace />;
  }

  return children;
};

export default ProtectedRoute;

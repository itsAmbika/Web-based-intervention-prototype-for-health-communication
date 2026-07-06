import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useMe } from '../api/useAuth';
import { PageSpinner } from '../components/ui/Spinner';

/**
 * Handles Google OAuth callback redirect from backend.
 * URL: /auth/callback?token=xxx&demographicsDone=false
 */
const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const demographicsDone = searchParams.get('demographicsDone') === 'true';

  // Set token in store immediately so useMe query can use it
  useEffect(() => {
    if (token) {
      setAccessToken(token);
    } else {
      // No token — bad callback, redirect to login
      navigate('/login', { replace: true });
    }
  }, [token, setAccessToken, navigate]);

  // Fetch user profile once token is set
  const { data: user, isSuccess, isError } = useMe();

  useEffect(() => {
    if (isError) {
      navigate('/login', { replace: true });
    }
    if (isSuccess && user) {
      setUser(user);
      navigate(demographicsDone ? '/dashboard' : '/demographics', { replace: true });
    }
  }, [isSuccess, isError, user, demographicsDone, navigate, setUser]);

  return <PageSpinner />;
};

export default AuthCallbackPage;

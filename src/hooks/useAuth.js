import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem('token');
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (
      isAuthenticated &&
      (!location.state?.step || location.state.step !== 'onboarding')
    ) {
      navigate(`/home/${id}`, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state, id]);

  return isAuthenticated;
};

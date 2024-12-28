import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/home/${id}`, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

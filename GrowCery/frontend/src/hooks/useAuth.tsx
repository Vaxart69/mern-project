import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = ({ requiredUserType }: { requiredUserType: 'admin' | 'customer' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      
      if (userData.userType !== requiredUserType) {
        navigate('/login');
        return;
      }

      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate, requiredUserType]);
};
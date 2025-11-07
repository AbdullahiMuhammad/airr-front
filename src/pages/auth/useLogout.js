import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 1. Remove tokens from localStorage (or cookies)
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // 2. Optionally, reset any app state
    // Example: setUser(null) if using Context or Redux

    // 3. Redirect to login page
    navigate('/login');
  };

  return logout;
};

export default useLogout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../services/userService';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userLogout();
      localStorage.removeItem('access_token'); 
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Logout
    </span>
  );
};

export default Logout;

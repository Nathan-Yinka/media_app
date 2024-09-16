import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const handleLoginSuccess = (payload) => {
    const { token,is_admin } = payload
    localStorage.setItem('authToken', token);
    localStorage.setItem('is_admin', false);
  };


export const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('is_admin');
    toast.success('User logged out successfully');
  };


export const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
  };

export const isAdmin = () => {
    const isAdmin = localStorage.getItem('is_admin');
    return isAdmin === 'true';
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};
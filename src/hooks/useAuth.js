import { useState, useEffect } from 'react';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        console.log('useAuth: Token retrieved from localStorage:', token);
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          console.log('useAuth: Fetching user with token:', token);
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('useAuth: Fetch user response status:', response.status);
          if (!response.ok) {
            throw new Error(`Fetch user failed with status: ${response.status}`);
          }
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Unexpected response format');
          }
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          console.log('useAuth: No token or user found, skipping fetchUser');
        }
      } catch (error) {
        console.error('useAuth: Fetch user error:', error.message);
        if (!user) {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signup = async (name, email, password, role) => {
    setLoading(true);
    try {
      const body = { name, email, password, role };
      console.log('useAuth: Sending signup request:', body);
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'Signup failed' };
      }
      const { token, user: userData } = data;
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
      console.log('useAuth: Signup token stored in cookie:', token);
      return { success: true, message: 'Signup successful' };
    } catch (error) {
      console.error('useAuth: Signup request error:', error.message);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Clear existing token before login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
      console.log('useAuth: Cleared old token and user data');

      const body = { email, password };
      console.log('useAuth: Sending login request:', body);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log('useAuth: /api/auth/login response status:', response.status);
      console.log('useAuth: /api/auth/login response headers:', [...response.headers]);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }
      const data = await response.json();
      console.log('useAuth: Login response data:', data);
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      const { token, user: userData } = data;
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
      console.log('useAuth: Login token received:', token);
      console.log('useAuth: Login token stored in cookie:', token);
      console.log('useAuth: Cookies after setting:', document.cookie);
      return { success: true, message: 'Login successful', user: userData, token };
    } catch (error) {
      console.error('useAuth: Login request error:', error.message);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
    console.log('useAuth: Logged out, cookies cleared');
  };

  return { user, loading, signup, login, logout };
}

export { useAuth };
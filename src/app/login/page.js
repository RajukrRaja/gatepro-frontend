'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('LoginPage: Submitting login form:', formData.email);
      const result = await login(formData.email, formData.password);
      console.log('LoginPage: Login result:', result);

      if (result.success) {
        toast.success('Logged in successfully! Redirecting...', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('LoginPage: User role:', result.user?.role);
        console.log('LoginPage: Cookies after login:', document.cookie);

        const role = result.user?.role?.toLowerCase();
        let redirectPath = '/';

        switch (role) {
          case 'admin':
            redirectPath = '/Admin';
            break;
          case 'teacher':
            redirectPath = '/Teacher';
            break;
          case 'student':
            redirectPath = '/Student';
            break;
          default:
            console.warn('LoginPage: Unknown or missing user role:', role);
            toast.warn('Unknown user role. Redirecting to home.', {
              position: 'top-right',
              autoClose: 3000,
            });
        }

        console.log(`LoginPage: Redirecting to: ${redirectPath}`);
        router.push(redirectPath);
      } else {
        const errorMessage = result.message || 'Login failed.';
        setErrors({ general: errorMessage });
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        });
        console.log('LoginPage: Login failed:', errorMessage);
      }
    } catch (error) {
      const errorMessage = error.message.includes('Invalid token')
        ? 'Invalid or expired session. Please try again.'
        : error.message.includes('User not found')
        ? 'User not found. Please check your email.'
        : 'An unexpected error occurred. Please try again.';
      setErrors({ general: errorMessage });
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('LoginPage: Login error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[300px] p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Login to GATEPro AI</h2>
        <p className="mb-6 text-sm text-gray-500">
          Access your personalized learning and teaching tools.
        </p>
        {errors.general && (
          <div className="mb-3 text-xs text-red-600 font-medium">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="rajukumar55@gmail.com"
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.email && (
            <div className="mb-3 text-xs text-red-600 font-medium">{errors.email}</div>
          )}

          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.password && (
            <div className="mb-3 text-xs text-red-600 font-medium">{errors.password}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
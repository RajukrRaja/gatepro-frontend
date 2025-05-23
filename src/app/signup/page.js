'use client'; // Mark this as a client component for interactivity

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For client-side navigation
import { useAuth } from '../../hooks/useAuth'; // Adjust path based on your project structure
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles

export default function Home() {
  const { signup, loading } = useAuth();
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const router = useRouter(); // Initialize router for redirection

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character (!@#$%^&*).';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setPasswordError('');

    const password = event.target.password.value;
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const formData = {
      name: event.target.fullName.value,
      email: event.target.email.value,
      password,
      role: event.target.role.value,
    };

    try {
      const { success, message } = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      if (success) {
        toast.success('Sign-up successful! Redirecting to login...', {
          position: 'top-right',
          autoClose: 2000, // Close after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        event.target.reset(); // Clear the form
        // Redirect to login page after a short delay to show the toast
        setTimeout(() => {
          router.push('/login'); // Adjust the path based on your routing
        }, 2500);
      } else {
        setFormError(message);
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[300px] p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Join GATEPro AI</h2>
        <p className="mb-6 text-sm text-gray-500">
          Unlock personalized learning and teaching tools.
        </p>
        {formError && (
          <div className="mb-3 text-xs text-red-600 font-medium">{formError}</div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Raju Kumar"
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />

          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="rajukumar.191813@gmail.com"
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />

          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
          {passwordError && (
            <div className="mb-3 text-xs text-red-600 font-medium">{passwordError}</div>
          )}

          <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full px-3 py-2 mb-6 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA1NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')] bg-no-repeat bg-[right_10px_center]"
            required
          >
            <option value="" disabled selected>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
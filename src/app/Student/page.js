'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'student') return null;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">Student Panel</h1>
      <p className="mt-2 text-gray-600">Welcome, {user.name}! Access your learning resources here.</p>
    </div>
  );
}
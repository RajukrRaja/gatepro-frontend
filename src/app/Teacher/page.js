'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TeacherPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'teacher') return null;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">Teacher Panel</h1>
      <p className="mt-2 text-gray-600">Welcome, {user.name}! Manage your teaching tools here.</p>
    </div>
  );
}
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardContent from '@/components/DashboardContent';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        Dashboard
      </h1>
      <DashboardContent />
    </div>
  );
}

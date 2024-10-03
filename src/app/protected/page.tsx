'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-4 gap-4">
      <h1 className="text-4xl font-bold text-black dark:text-white mt-4 text-center">
        This is a protected page!
      </h1>

      <p className="text-xl text-black dark:text-white">
        Welcome, <span className="font-bold">{session.user?.name}</span>!
      </p>
    </div>
  );
}

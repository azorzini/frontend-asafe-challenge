'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 absolute top-0 left-0 right-0 z-50">
      <h1 className="text-xl text-black dark:text-white">
        Frontend A-Safe App
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? (
          <div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="underline text-black dark:text-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="underline text-black dark:text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

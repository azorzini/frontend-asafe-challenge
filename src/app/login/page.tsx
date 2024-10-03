'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      username: userInfo.username,
      password: userInfo.password,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/protected`,
    });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-4">
      <h1 className="text-2xl mb-4 font-bold text-black dark:text-white">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          className="border p-2 rounded text-black dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          className="border p-2 rounded text-black dark:text-white"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}

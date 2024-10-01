import { Suspense } from 'react';
import UserTableServer from '@/components/UserTableServer';

export default function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-4">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4 ml-4">
        Users
      </h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <UserTableServer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

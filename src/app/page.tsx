import ThemeToggle from '../components/ThemeToggle';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-4">
      <ThemeToggle />
      <h1 className="text-4xl font-bold text-black dark:text-white mt-4">
        Welcome to Next.js with Tailwind CSS!
      </h1>
    </main>
  );
}

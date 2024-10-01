import DashboardContent from '@/components/DashboardContent';

export const metadata = {
  title: 'A-Safe test | Dashboard',
  description: 'This is a Next / React challenge',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 p-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        Dashboard
      </h1>
      <DashboardContent />
    </div>
  );
}

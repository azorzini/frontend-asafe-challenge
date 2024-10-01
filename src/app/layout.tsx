import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '@/components/Header';

export const metadata = {
  title: 'A-Safe test app',
  description: 'This is a Next / React challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 relative pt-16">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

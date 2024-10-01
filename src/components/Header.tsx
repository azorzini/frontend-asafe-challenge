'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = session
    ? [
        { href: '/protected', label: 'Home' },
        { href: '/protected/dashboard', label: 'Dashboard' },
        { href: '/protected/users', label: 'Users' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
      ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-gray-100 dark:bg-gray-800 transition-colors duration-500 fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl text-black dark:text-white">A-Safe Test</h1>
          </div>
          {session && (
            <div className="flex space-x-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActive(link.href)
                      ? 'text-blue-500'
                      : 'text-black dark:text-white'
                  } hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="underline text-black dark:text-white"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="underline text-black dark:text-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl text-black dark:text-white">A-Safe Test</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-blue-500 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block ${
                  isActive(link.href)
                    ? 'text-blue-500'
                    : 'text-black dark:text-white'
                } hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex place-content-around border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <ThemeToggle />
              {session ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="underline text-black dark:text-white"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signIn();
                  }}
                  className="underline text-black dark:text-white mt-2"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

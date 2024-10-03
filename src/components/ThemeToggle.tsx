'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(theme === 'dark');
  }, [theme]);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = enabled ? 'light' : 'dark';
    setTheme(newTheme);
    setEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={clsx(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500'
      )}
    >
      <span className="sr-only">Toggle Theme</span>
      <span
        className={clsx(
          enabled ? 'translate-x-9' : 'translate-x-1',
          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-500'
        )}
      >
        {enabled ? (
          <MoonIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        )}
      </span>
    </Switch>
  );
}

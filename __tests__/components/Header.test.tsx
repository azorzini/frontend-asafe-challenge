import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

describe('Header Component', () => {
  const mockUseSession = useSession as jest.Mock;

  beforeEach(() => {
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation links for unauthenticated users', () => {
    render(<Header />);

    const headers = screen.getAllByText('A-Safe Test');
    expect(headers).toHaveLength(2);

    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeDefined();
  });

  it('renders navigation links for authenticated users', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });

    render(<Header />);

    const headers = screen.getAllByText('A-Safe Test');
    expect(headers).toHaveLength(2);

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Users')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeDefined();
  });
});

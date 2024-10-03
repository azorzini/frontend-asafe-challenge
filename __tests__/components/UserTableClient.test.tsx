import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTableClient from '@/components/UserTableClient';
import useUsers from '../../src/app/hooks/useUsers';

jest.mock('../../src/app/hooks/useUsers', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('UserTableClient', () => {
  const mockInitialData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      age: 25,
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
  ];

  const mockSetPagination = jest.fn();
  const mockSetKeyword = jest.fn();

  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({
      data: mockInitialData,
      loading: false,
      pageCount: 1,
      pagination: { pageIndex: 0, pageSize: 10 },
      setPagination: mockSetPagination,
      keyword: '',
      setKeyword: mockSetKeyword,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with data', () => {
    render(
      <UserTableClient
        initialData={[]}
        initialPageIndex={0}
        initialKeyword=""
        pageCount={1}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useUsers as jest.Mock).mockReturnValueOnce({
      data: [],
      loading: true,
      pageCount: 1,
      pagination: { pageIndex: 0, pageSize: 10 },
      setPagination: mockSetPagination,
      keyword: '',
      setKeyword: mockSetKeyword,
    });

    render(
      <UserTableClient
        initialData={[]}
        initialPageIndex={0}
        initialKeyword=""
        pageCount={1}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays no results found when data is empty', () => {
    (useUsers as jest.Mock).mockReturnValueOnce({
      data: [],
      loading: false,
      pageCount: 1,
      pagination: { pageIndex: 0, pageSize: 10 },
      setPagination: mockSetPagination,
      keyword: '',
      setKeyword: mockSetKeyword,
    });

    render(
      <UserTableClient
        initialData={[]}
        initialPageIndex={0}
        initialKeyword=""
        pageCount={1}
      />
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('calls setKeyword on search input change', () => {
    render(
      <UserTableClient
        initialData={[]}
        initialPageIndex={0}
        initialKeyword=""
        pageCount={1}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });

    expect(mockSetKeyword).toHaveBeenCalledWith('Jane');
  });
});

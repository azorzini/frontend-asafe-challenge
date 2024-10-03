import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
}

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  keyword: string;
}

interface UseUsersResult {
  data: User[];
  loading: boolean;
  pageCount: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function useUsers(
  initialData: User[],
  initialPageIndex: number,
  initialKeyword: string,
  initialPageCount: number
): UseUsersResult {
  const [data, setData] = useState<User[]>(initialData);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(initialKeyword);

  const [debouncedKeyword] = useDebounce(keyword, 500);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: 30,
    keyword: initialKeyword,
  });

  useEffect(() => {
    if (debouncedKeyword !== pagination.keyword) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
        keyword: debouncedKeyword,
      }));
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/users?page=${pagination.pageIndex + 1}&pageSize=${
            pagination.pageSize
          }&q=${encodeURIComponent(pagination.keyword)}`
        );
        const json = await res.json();
        setData(json.results);
        setPageCount(Math.ceil(json.total / pagination.pageSize));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination]);

  return {
    data,
    loading,
    pageCount,
    pagination,
    setPagination,
    keyword,
    setKeyword,
  };
}

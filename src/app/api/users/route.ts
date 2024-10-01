import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get('page') || '1';
  const pageSizeParam = searchParams.get('pageSize') || '50';
  const keyword = searchParams.get('q') || '';

  const page = parseInt(pageParam, 10);
  const pageSize = parseInt(pageSizeParam, 10);
  const skip = (page - 1) * pageSize;

  const encodedKeyword = encodeURIComponent(keyword);

  let apiUrl = '';

  if (encodedKeyword.trim() === '') {
    apiUrl = `https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`;
  } else {
    apiUrl = `https://dummyjson.com/users/search?q=${encodedKeyword}&limit=${pageSize}&skip=${skip}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json({
      results: data.users,
      total: data.total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

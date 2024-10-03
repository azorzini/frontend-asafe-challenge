import UserTableClient from './UserTableClient';

export default async function UserTableServer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams.page;
  const pageIndex = pageParam
    ? Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) - 1
    : 0;

  const keywordParam = searchParams.keyword;
  const keyword = keywordParam
    ? Array.isArray(keywordParam)
      ? keywordParam[0]
      : keywordParam
    : '';

  const pageSize = 30;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/users?page=${
      pageIndex + 1
    }&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`,
    {
      cache: 'no-store',
    }
  );
  const json = await res.json();

  const { results, total } = json;
  const pageCount = Math.ceil(total / pageSize);

  return (
    <UserTableClient
      initialData={results}
      initialPageIndex={pageIndex}
      initialKeyword={keyword}
      pageCount={pageCount}
    />
  );
}

import { useState, useEffect } from 'react';

export default function usePagination<T>(data: any) {
  const [pageIndex, setPageIndex]: [number, Function] = useState(1);
  const [items, setItems]: [T[], Function] = useState([]);
  const [hasMore, setHasMore]: [boolean, Function] = useState(false);

  useEffect(() => {
    if (!data) return;
    const { items: newItems, pageSize, totalCount, pageIndex } = data;
    const lastPage = totalCount / pageSize;
    setHasMore(lastPage > pageIndex);
    setItems((items) => (pageIndex === 1 ? newItems : [...items, ...newItems]));
  }, [data]);

  const nextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const resetPagination = () => {
    setPageIndex(1);
  };

  return {
    pageIndex,
    setPageIndex,
    items,
    hasMore,
    nextPage,
    resetPagination,
  };
}

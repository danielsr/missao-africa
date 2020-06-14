import { useState, useEffect } from 'react';

export default function usePagination<T>(data: any) {
  const [pageIndex, setPageIndex]: [number, Function] = useState(1);
  const [items, setItems]: [T[], Function] = useState([]);
  const [hasMore, setHasMore]: [boolean, Function] = useState(false);

  useEffect(() => {
    const { items: newItems, pageSize, totalCount } = data;
    const lastPage = totalCount / pageSize;
    setHasMore(lastPage > pageIndex);
    setItems(pageIndex === 1 ? newItems : [...items, ...newItems]);
  }, [data]);

  const nextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  return {
    pageIndex,
    setPageIndex,
    nextPage,
    items,
    hasMore,
  };
}

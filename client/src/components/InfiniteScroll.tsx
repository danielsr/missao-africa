import React, { useRef, useCallback, useEffect } from 'react';
import Spinner from './Spinner';

type InfiniteScrollProps = {
  loadMore: Function;
  hasMore: boolean;
  isLoading: boolean;
};

function InfiniteScroll({ loadMore, hasMore, isLoading }: InfiniteScrollProps) {
  const loader = useRef(null);

  const loadMoreCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const options = {
      root: null, // window by default
      rootMargin: '0px',
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(loadMoreCallback, options);
    const element = loader.current as any;

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [loader, loadMoreCallback]);

  return (
    <div className="flex justify-center mt-4" ref={loader}>
      {isLoading && <Spinner />}
    </div>
  );
}

export default InfiniteScroll;

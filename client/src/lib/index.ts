import { Pagination } from 'types';

export function getUpdatedArray<T>(array: T[], obj: T, key = 'id') {
  const index = array.findIndex((item) => item[key] === obj[key]);
  if (index > -1) {
    return [...array.slice(0, index), obj, ...array.slice(index + 1)];
  }
  return array;
}

export function getPagination(pagination): Pagination {
  const { pageIndex, pageSize, totalCount } = pagination;
  const lastPage = totalCount / pageSize;
  const hasMore = lastPage > pageIndex;

  return { pageIndex, pageSize, totalCount, hasMore };
}

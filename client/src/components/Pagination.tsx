import React from 'react';

export type PaginationProps = {
    pageSize?: number;
    pageIndex?: number;
    totalCount?: number;
    onChange?: Function;
};

export default function Pagination({ pageSize, pageIndex, totalCount, onChange }: PaginationProps) {
    const totalPages = totalCount && pageSize ? Math.round(totalCount / pageSize) : 1;
    const pages = Array(totalPages)
        .fill(null)
        .map((v, i) => i + 1);

    return (
        <div>
            {pages.map((page) => (
                <span className="mr-2 cursor-pointer" key={page} onClick={() => onChange?.(page)}>
                    {page}
                </span>
            ))}
        </div>
    );
}

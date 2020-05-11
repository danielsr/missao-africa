import { Request } from 'express';

export function getPageInfo(req: Request) {
    const pageSize = 15;
    const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : 1;
    const pagedResponse = (result) => ({ items: result[0], pageSize, pageIndex, totalCount: result[1] });
    return { pageSize, pageIndex, pagedResponse };
}

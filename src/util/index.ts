import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(req: Request, queryBuilder: SelectQueryBuilder<T>) {
    const pageSize = 50;
    const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : 1;
    const result = await queryBuilder
        .skip(pageSize * (pageIndex - 1))
        .take(pageSize)
        .getManyAndCount();

    return { items: result[0], pageSize, pageIndex, totalCount: result[1] };
}

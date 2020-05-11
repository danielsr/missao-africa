import { getRepository, Like, SelectQueryBuilder } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';
import { NotFound } from '../middlewares/errorHandler';
import { getPageInfo } from '../util';

export class PersonController {
    private repo = getRepository(Person);

    async all(req: Request, res: Response, next: NextFunction) {
        const { pageSize, pageIndex, pagedResponse } = getPageInfo(req);
        const result = await this.repo
            .createQueryBuilder('persons')
            .skip(pageSize * (pageIndex - 1))
            .take(pageSize)
            .orderBy('id')
            .getManyAndCount();
        return pagedResponse(result);
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const person = await this.repo.findOne(req.params.id);
        return person || next(NotFound);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        return this.repo.save(req.body);
    }

    async import(req: Request, res: Response, next: NextFunction) {
        const persons = req.body as Person[];
        persons.map(async (person) => {
            await this.repo.save(person);
        });
        return { count: persons.length };
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const person = await this.repo.findOne(req.params.id);
        await this.repo.remove(person);
    }
}

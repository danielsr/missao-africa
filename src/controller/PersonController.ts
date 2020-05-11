import { getRepository, Like, SelectQueryBuilder } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';
import { NotFound } from '../middlewares/errorHandler';
import { paginate } from '../util';

export class PersonController {
    private repo = getRepository(Person);

    async all(req: Request, res: Response, next: NextFunction) {
        const search = `%${req.query.search ? req.query.search.toString().toLowerCase() : ''}%`;
        const queryBuilder = this.repo
            .createQueryBuilder('persons')
            .where('LOWER(persons.name) like :search or LOWER(persons.email) like :search', { search })
            .orderBy('id');
        return paginate(req, queryBuilder);
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

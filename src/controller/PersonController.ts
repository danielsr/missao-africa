import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';
import { NotFound } from '../middlewares/errorHandler';
import { paginate } from '../util';

export default {
    async all(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Person);
        const search = `%${req.query.search ? req.query.search.toString().toLowerCase() : ''}%`;
        const queryBuilder = repo
            .createQueryBuilder('persons')
            .where('LOWER(persons.name) like :search or LOWER(persons.email) like :search', { search })
            .orderBy('id');
        return paginate(req, queryBuilder);
    },

    async one(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Person);
        const person = await repo.findOne(req.params.id);
        return person || next(NotFound);
    },

    async save(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Person);
        return repo.save(req.body);
    },

    async import(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Person);
        const persons = req.body as Person[];
        persons.map(async (person) => {
            await repo.save(person);
        });
        return { count: persons.length };
    },

    async remove(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Person);
        const person = await repo.findOne(req.params.id);
        await repo.remove(person);
    },
};

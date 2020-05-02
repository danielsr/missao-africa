import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';
import { NotFound } from '../middlewares/errorHandler';

export class PersonController {
    private repo = getRepository(Person);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.repo.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const person = await this.repo.findOne(req.params.id);
        return person || next(NotFound);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        return this.repo.save(req.body);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const person = await this.repo.findOne(req.params.id);
        await this.repo.remove(person);
    }
}

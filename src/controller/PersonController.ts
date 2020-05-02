import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';

export class PersonController {
    private repo = getRepository(Person);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.repo.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.repo.findOne(req.params.id);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        return this.repo.save(req.body);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const userToRemove = await this.repo.findOne(req.params.id);
        await this.repo.remove(userToRemove);
    }
}

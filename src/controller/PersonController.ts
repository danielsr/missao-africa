import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Person } from '../entity/Person';

export class PersonController {
    private personRepository = getRepository(Person);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.personRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.personRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.personRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.personRepository.findOne(request.params.id);
        await this.personRepository.remove(userToRemove);
    }
}

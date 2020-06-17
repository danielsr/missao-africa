import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { BadRequest } from '../middlewares/errorHandler';

export default class SetupController {
    static setup = async (req: Request, res: Response, next: NextFunction) => {
        const repo = getRepository(User);
        const users = await repo.find();
        if (users.length > 0) {
            return next(BadRequest);
        }

        const user = new User();
        user.email = 'danielsr@gmail.com';
        user.password = 'admin';
        user.hashPassword();
        await repo.save(user);

        return { setup: 'ok' };
    };
}

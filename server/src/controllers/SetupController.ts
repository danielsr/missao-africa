import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { BadRequest } from '../middlewares/errorHandler';
import { Label } from '../entity/Label';

export default class SetupController {
    static setup = async (req: Request, res: Response, next: NextFunction) => {
        const userRepo = getRepository(User);
        const users = await userRepo.find();
        if (users.length > 0) {
            return next(BadRequest);
        }

        const user = new User();
        user.name = 'Daniel';
        user.email = 'danielsr@gmail.com';
        user.password = 'admin';
        user.hashPassword();
        await userRepo.save(user);

        const labelRepo = getRepository(Label);
        const defaultLabels: Label[] = [{ name: 'New' }, { name: 'Sponsors' }];
        labelRepo.save(defaultLabels);

        return { setup: 'ok' };
    };
}

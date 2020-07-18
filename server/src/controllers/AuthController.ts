import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { BadRequest, Unauthorized } from '../middlewares/errorHandler';

export default class AuthController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        const jwtSecret = process.env.JWT_SECRET;
        const { email, password } = req.body;

        if (!(email && password)) {
            next(BadRequest);
        }

        const repo = getRepository(User);
        let user: User;
        try {
            user = await repo.findOneOrFail({ where: { email } });
        } catch (error) {
            next(Unauthorized);
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            next(Unauthorized);
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

        return token;
    };
}

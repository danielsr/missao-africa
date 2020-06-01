import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['auth'] as string;
    const jwtSecret = process.env.JWT_SECRET;
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);

    next();
};

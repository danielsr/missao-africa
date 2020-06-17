import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Label } from '../entity/Label';

export default class LabelController {
    static async all(req: Request, res: Response, next: NextFunction) {
        const repo = getRepository(Label);
        return repo.find();
    }
}

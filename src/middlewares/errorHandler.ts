import { Request, Response, NextFunction } from 'express';

export class ServerError extends Error {
    statusCode: number;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const NotFound = new ServerError(404, 'Not found');
export const GenericError = (error: Error) => new ServerError(500, error.message);

export function errorHandler(err: ServerError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode).send(err.message);
}

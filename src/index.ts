import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Routes } from './routes';
import { errorHandler, GenericError } from './middlewares/errorHandler';

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use(helmet());

        Routes.forEach((route) => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => res.send(result)).catch((error) => next(GenericError(error)));
                } else {
                    res.send(result);
                }
            });
        });

        app.use(errorHandler);

        const port = 3001;
        app.listen(port);
        console.log(`Express server has started on port ${port}.`);
    })
    .catch((error) => console.log(error));

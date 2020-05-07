import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

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
                    result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        app.use(errorHandler);

        app.listen(3001);

        console.log('Express server has started on port 3000.');
    })
    .catch((error) => console.log(error));

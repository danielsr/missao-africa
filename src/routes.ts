import PersonController from './controllers/PersonController';
import AuthController from './controllers/AuthController';
import { checkJwt } from './middlewares/checkJwt';

export const Routes = [
    {
        method: 'get',
        route: '/persons',
        controller: PersonController.all,
        middlewares: [checkJwt],
    },
    {
        method: 'get',
        route: '/persons/:id',
        controller: PersonController.one,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/persons',
        controller: PersonController.save,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/persons-import',
        controller: PersonController.import,
        middlewares: [checkJwt],
    },
    {
        method: 'delete',
        route: '/persons/:id',
        controller: PersonController.remove,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/login',
        controller: AuthController.login,
        middlewares: [],
    },
];

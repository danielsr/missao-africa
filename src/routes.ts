import personController from './controllers/personController';
import { checkJwt } from './middlewares/checkJwt';

export const Routes = [
    {
        method: 'get',
        route: '/persons',
        controller: personController.all,
        middlewares: [checkJwt],
    },
    {
        method: 'get',
        route: '/persons/:id',
        controller: personController.one,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/persons',
        controller: personController.save,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/persons-import',
        controller: personController.import,
        middlewares: [checkJwt],
    },
    {
        method: 'delete',
        route: '/persons/:id',
        controller: personController.remove,
        middlewares: [checkJwt],
    },
];

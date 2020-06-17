import PersonController from './controllers/PersonController';
import AuthController from './controllers/AuthController';
import LabelController from './controllers/LabelController';
import { checkJwt } from './middlewares/checkJwt';
import SetupController from './controllers/SetupController';

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
    {
        method: 'get',
        route: '/labels',
        controller: LabelController.all,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/setup',
        controller: SetupController.setup,
        middlewares: [],
    },
];

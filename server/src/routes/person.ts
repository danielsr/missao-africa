import PersonController from '../controllers/PersonController';
import { checkJwt } from '../middlewares/checkJwt';

export default [
    {
        method: 'get',
        route: '/persons',
        controller: PersonController.all,
        middlewares: [checkJwt],
    },
    {
        method: 'get',
        route: '/persons/check-email',
        controller: PersonController.checkEmail,
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
];

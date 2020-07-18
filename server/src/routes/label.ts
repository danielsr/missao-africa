import LabelController from '../controllers/LabelController';
import { checkJwt } from '../middlewares/checkJwt';

export default [
    {
        method: 'get',
        route: '/labels',
        controller: LabelController.all,
        middlewares: [checkJwt],
    },
    {
        method: 'post',
        route: '/labels',
        controller: LabelController.save,
        middlewares: [checkJwt],
    },
];

import LabelController from '../controllers/LabelController';
import { checkJwt } from '../middlewares/checkJwt';

export default [
    {
        method: 'get',
        route: '/labels',
        controller: LabelController.all,
        middlewares: [checkJwt],
    },
];

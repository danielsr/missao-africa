import SetupController from '../controllers/SetupController';

export default [
    {
        method: 'post',
        route: '/setup',
        controller: SetupController.setup,
        middlewares: [],
    },
];

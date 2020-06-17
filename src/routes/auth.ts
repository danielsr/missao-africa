import AuthController from '../controllers/AuthController';

export default [
    {
        method: 'post',
        route: '/login',
        controller: AuthController.login,
        middlewares: [],
    },
];

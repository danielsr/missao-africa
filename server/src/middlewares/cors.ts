import { Request, Response, NextFunction } from 'express';

function cors(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-xsrf-token',
    );
    res.header('Access-Control-Expose-Headers', 'Token');
    next();
}

export default cors;

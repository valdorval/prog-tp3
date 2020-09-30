import { NextFunction, Request, Response } from 'express';

const wrap = (fn => (req, res, next) => fn(req, res, next).catch(next)) as
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => void;

export { wrap };

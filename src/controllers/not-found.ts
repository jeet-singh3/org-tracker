import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
    res.sendStatus(404);
};

export { notFound };

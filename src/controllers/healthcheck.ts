import { Request, Response } from 'express';

const healthcheck = (req: Request, res: Response) => {
    res.status(200).send({ message: 'healthy!' });
};

export { healthcheck };

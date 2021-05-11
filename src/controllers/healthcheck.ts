import { Request, Response } from 'express';

const healthcheck = (req: Request, res: Response) => {
    console.log('Healthcheck endpoint hit!');
    res.status(200).send({ message: 'healthy!' });
};

export { healthcheck };

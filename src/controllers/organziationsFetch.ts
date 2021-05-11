import { Request, Response } from 'express';
import { pool } from '../utils/dbPool'

const org_search = async (req: Request, res: Response) => {
    console.log('Organization Search endpoint hit!');
    console.log(req.query);
    try {
        console.log("hello world")
        res.status(200).send({ message: "hello world" });
    } catch (error) {
        res.status(500).send({message: error.message})
    }
   
};

export { org_search };

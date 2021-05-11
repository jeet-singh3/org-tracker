import { Request, Response } from 'express';
import { validate_fetch_request, generate_sql_statement, ValidationError } from '../utils/utilities'
import { pool } from '../utils/dbPool'

const org_search = async (req: Request, res: Response) => {
    console.log('Organization Search endpoint hit!');
    try {
        await validate_fetch_request(req.query)
        const sql_stmt = await generate_sql_statement(req.query)
        console.log(sql_stmt)
        res.status(200).send({ message: "hello world" });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).send({message: error.message});
        } else {
            res.status(500).send({message: error.message})
        }
    }
   
};

export { org_search };

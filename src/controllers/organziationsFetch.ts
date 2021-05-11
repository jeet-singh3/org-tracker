import { Request, Response } from 'express';
import { 
    validate_fetch_request, 
    generate_sql_statement, 
    ValidationError,
    extract_params 
} from '../utils/utilities'
import { pool } from '../utils/dbPool'

const org_search = async (req: Request, res: Response) => {
    console.log('Organization Search endpoint hit!');
    try {
        await validate_fetch_request(req.query)
        const sql_stmt = await generate_sql_statement(req.query)
        const params = await extract_params(req.query)
    
        pool.query(sql_stmt, params, (err, result) => {
                if (err) {
                    throw err
                }
                res.status(200).send(result.rows);
                return
            }
        )
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).send({message: error.message});
        } else {
            res.status(500).send({message: error.message})
        }
    }
   
};

export { org_search };

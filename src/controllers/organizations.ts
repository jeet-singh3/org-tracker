import { Request, Response } from 'express';
import { Pool } from 'pg'
import { validate_request, ValidationError } from '../utils/utilities'

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "10001", 10) || 10001,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const org_create = async (req: Request, res: Response) => {
    console.log('Organization Create endpoint hit!');
    console.log(req.body);
    try {
        await validate_request(req);
        pool.query(
            'insert into organizations (name, createDate, employees, isPublic) select $1, $2, $3, $4 on conflict(name)' +
            'do update set createDate = $2, employees = $3, isPublic = $4 where organizations.name = $1', 
            [req.body.name.toLowerCase(), req.body.createDate, req.body.employees, req.body.isPublic], 
            (err: Error , result: { rows: { name: any }[] }) => {
                if (err) {
                    throw err
                }
                let returnable = `Inserted organization ${req.body.name.toLowerCase()} created on ${req.body.createDate} `+
                                `with ${req.body.employees} emplpoyees. Is Public: ${req.body.isPublic}.`
                res.status(201).send({ message: returnable });
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

export { org_create };

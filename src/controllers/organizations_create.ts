import { Request, Response } from 'express';
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "10001", 10) || 10001,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

class ValidationError extends Error {
    constructor(message: string) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}

const org_create = async (req: Request, res: Response) => {
    console.log('Organization Create endpoint hit!');
    console.log(req.body);
    try {
        await validate_request(req, res);
        pool.query(
            'insert into organizations (name, createDate, employees, isPublic) select $1, $2, $3, $4', 
            [req.body.name, req.body.createDate, req.body.employees, req.body.isPublic], 
            (err: Error , result: { rows: { name: any }[] }) => {
                if (err) {
                    throw err
                }
                let returnable = `Inserted organization ${req.body.name} created on ${req.body.createDate} `+
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

async function validate_request(req: Request, res: Response): Promise<void> {
    if (!('name' in req.body)) {
        throw new ValidationError("Organization name is required to create an organization")
    };
    if (!('createDate' in req.body)) {
        throw new ValidationError("Organizations must have a creation date in the form YYYY-MM-DD")
    };
    if (!('employees' in req.body)) {
        throw new ValidationError("Organizations must have employees")
    };
    if (!('isPublic' in req.body)) {
        throw new ValidationError("Organization must be either public (true) or private (false)")
    };
}

export { org_create };

import { Request, Response } from 'express';
import { validate_create_request, ValidationError } from '../utils/utilities'
import { pool } from '../utils/dbPool'

const org_create = async (req: Request, res: Response) => {
    console.log('Organization Create endpoint hit!');
    console.log(req.body);
    try {
        await validate_create_request(req);
        pool.query(
            'insert into organizations (name, createDate, employees, isPublic) select $1, $2, $3, $4 on conflict(name)' +
            'do update set createDate = $2, employees = $3, isPublic = $4 where organizations.name = $1', 
            [req.body.name.toLowerCase(), req.body.createDate, req.body.employees, req.body.isPublic], 
            (err: Error , result: { rows: { name: any }[] }) => {
                if (err) {
                    throw err
                }
                console.log(result)
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

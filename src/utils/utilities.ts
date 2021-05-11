import { Request } from 'express';

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

async function extract_params(queries: any): Promise<Array<string>> {
    try {
        let params = []
        console.log(queries)
        for (const key in queries) {
            const value = queries[key]
            if (typeof value == "string") { 
                params.push(value) 
            } else { 
                for (const superkey in value) {
                    let supervalue = value[superkey]
                    params.push(supervalue)
                }
            }
        }
        return Promise.resolve(params)
    } catch (err) {
        throw new Error(err.message)
    }
}


async function generate_sql_statement(queries: Request["query"]): Promise<string> {
    let sql_stmt = "select name, createDate, employees, isPublic from organizations "
    if (Object.keys(queries).length == 0) {
        return Promise.resolve(sql_stmt);
    } else {
        sql_stmt += "where ";
        let i = 0
        for (const key in queries) {
            const value = queries[key]
            i++;
            if (i > 1) { if (!(sql_stmt.endsWith("and "))) { sql_stmt += "and " } };
            if (key == 'name') { sql_stmt += `name ~ $${i} `; continue;
            } else if (key == "createDate") { sql_stmt += "createDate ";
            } else if (key == "employees") { sql_stmt += "employees ";
            } else if (key == "isPublic") { sql_stmt += `isPublic = $${i} `; continue;
            } else { i--; continue; }
            
            if (typeof value != "string") {
                for (const superkey in value) {
                    if (superkey == "lt") { sql_stmt += `< $${i} `; continue;
                    } else if (superkey == "lte") { sql_stmt += `<= $${i} `; continue;
                    } else if (superkey == "gt") {sql_stmt += `> $${i} `; continue;
                    } else if (superkey == "gte") {sql_stmt += `>= $${i} `; continue; 
                    } else { sql_stmt += `= $${i} `; continue }  
                }
            } else { sql_stmt += `= $${i} `}
        }
    }
    return Promise.resolve(sql_stmt)
}

async function validate_fetch_request(queries: Request["query"]): Promise<void> {
    for (const key in queries) {
        const value = queries[key]
        if (key == 'name' && typeof value!= "string") {
            throw new ValidationError("Name must be a string")
        }
        if (key == 'isPublic' && typeof value!= "string") {
            throw new ValidationError("isPublic must be a string")
        }
        if (key == 'isPublic' && (value != "true" && value != "false")) {
            throw new ValidationError("isPublic must be either true or false")
        }
    }
}

async function validate_create_request(req: Request): Promise<void> {
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

export { validate_create_request, validate_fetch_request, generate_sql_statement, extract_params, ValidationError }
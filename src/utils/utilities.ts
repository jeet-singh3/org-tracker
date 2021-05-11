import { Request } from 'express';

class ValidationError extends Error {
    constructor(message: string) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}

async function validate_request(req: Request): Promise<void> {
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

export { validate_request, ValidationError }
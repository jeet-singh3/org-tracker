import request from 'supertest';
import app from '../app';

describe('app', () => {
    it('should return status 400 for no creation date from /organizations', async () => {
        const orgCreate = await request(app)
            .post('/api/v1/organizations')
            .set('Accept', 'application/json')
            .send({
                name: 'john',
                employees: 100,
                isPublic: true
            });
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"Organizations must have a creation date in the form YYYY-MM-DD"}')
    });
    it('should return status 400 for no name from /organizations', async () => {
        const orgCreate = await request(app)
            .post('/api/v1/organizations')
            .set('Accept', 'application/json')
            .send({
                createDate: '2020-02-01',
                employees: 100,
                isPublic: true
            })
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"Organization name is required to create an organization"}')
    });
    it('should return status 400 for no employees from /organizations', async () => {
        const orgCreate = await request(app)
            .post('/api/v1/organizations')
            .set('Accept', 'application/json')
            .send({
                name: 'John',
                createDate: '2020-02-01',
                isPublic: true
            })
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"Organizations must have employees"}')
    });
    it('should return status 400 for no public info from /organizations', async () => {
        const orgCreate = await request(app)
            .post('/api/v1/organizations')
            .set('Accept', 'application/json')
            .send({
                name: 'John',
                createDate: '2020-02-01',
                employees: 100
            })
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"Organization must be either public (true) or private (false)"}')
    });
    it('should return status 201 from /organizations', async () => {
        const orgCreate = await request(app)
            .post('/api/v1/organizations')
            .set('Accept', 'application/json')
            .send({
                name: 'john',
                createDate: '2020-02-01',
                employees: 100,
                isPublic: true
            })
        expect(orgCreate.status).toEqual(201)
    });
});
import request from 'supertest';
import app from '../app';

describe('app', () => {
    it('should return status 200 for fetch /organizations', async () => {
        const orgCreate = await request(app)
            .get('/api/v1/organizations?name=jeet&createDate[lt]=2020-01-01&employees[lte]=100&isPublic=true')
        expect.assertions(2)
        expect(orgCreate.status).toEqual(200)
        expect(orgCreate.text).toEqual('{"message":"hello world"}')
    });
});

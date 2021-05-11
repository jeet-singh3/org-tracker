import request from 'supertest';
import app from '../app';

const random_org = "[{\"name\":\"random\",\"createdate\":\"2021-02-02T05:00:00.000Z\",\"employees\":\"100\",\"ispublic\":true}]"

describe('app', () => {
    it('should return status 200 for fetch /organizations', async () => {
        const orgCreate = await request(app)
            .get('/api/v1/organizations?name=random')
        expect.assertions(2)
        expect(orgCreate.status).toEqual(200)
        expect(orgCreate.text).toEqual(random_org)
    });
    it('should return status 400 for bad fetch isPublic /organizations', async () => {
        const orgCreate = await request(app)
            .get('/api/v1/organizations?isPublic=else')
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"isPublic must be either true or false"}')
    });
    it('should return status 400 for bad fetch name /organizations', async () => {
        const orgCreate = await request(app)
            .get('/api/v1/organizations?name[gt]=else')
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"Name must be a string"}')
    });
    it('should return status 400 for bad fetch isPublic string /organizations', async () => {
        const orgCreate = await request(app)
            .get('/api/v1/organizations?isPublic[gt]=else')
        expect.assertions(2)
        expect(orgCreate.status).toEqual(400)
        expect(orgCreate.text).toEqual('{"message":"isPublic must be a string"}')
    });
});

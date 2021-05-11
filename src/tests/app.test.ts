import request from 'supertest';
import app from '../app';

describe('app', () => {
    it('should return healthy from /healthcheck', (done) => {
        request(app)
            .get(`/api/v1/healthcheck`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: 'healthy!' });
                return done();
            });
    });
    it('should return 404 from undefined routes', (done) => {
        request(app)
            .get(`/api/v1/i-do-not-exist`)
            .expect('Content-Type', /plain/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({});
                return done();
            });
    });
});

import express from 'express';
import { healthcheck, org_create, notFound } from '../controllers';

const routes = express.Router();
routes.get('/healthcheck', express.json(), healthcheck);
routes.post('/organizations', express.json(), org_create)
routes.all('*', notFound);

export default routes;

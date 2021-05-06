import express from 'express';
import { healthcheck, notFound } from '../controllers';

const routes = express.Router();
routes.get('/healthcheck', express.json(), healthcheck);
routes.all('*', notFound);

export default routes;

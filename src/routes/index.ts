import express from 'express';
import { 
    healthcheck, 
    org_create,
    org_search, 
    notFound 
} from '../controllers';

const routes = express.Router();
routes.get('/healthcheck', express.json(), healthcheck);
routes.post('/organizations', express.json(), org_create)
routes.get('/organizations', express.json(), org_search)
routes.all('*', notFound);

export default routes;

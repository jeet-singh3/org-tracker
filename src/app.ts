import express from 'express';
import helmet from 'helmet';
import routes from './routes';

const app = express();
app.use(helmet());
app.use('/api/v1/', routes);

export default app;

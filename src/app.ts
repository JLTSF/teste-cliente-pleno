import express from 'express';
import cors from 'cors';
import { morganMiddleware } from './helpers/morgan-helper';
import router from './router';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);
app.use(morganMiddleware);

export { app };

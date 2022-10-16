import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import { routes } from './routes/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log('server running'));

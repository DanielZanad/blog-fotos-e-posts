import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
const port = process.env.SERVER_PORT;

app.get('post', (req, res) => {
  res.send('ok');
});

app.listen(() => console.log('server running'), port?.toString);

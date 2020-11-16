import * as dotenv from 'dotenv';

dotenv.config();


import express from 'express';

const app = express();

import routers from './routers/index.js';
import bodyParser from 'body-parser';

app.use(bodyParser.json({type: 'application/json'}));

app.use('/', routers);

const proc = process.env.PORT || 3000;

console.log(`Server started at PORT=${proc}`);
app.listen(proc);

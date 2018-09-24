'use strict';

const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

let app = express();


app.use(cors()); //allows for cross-origin requests
app.use(morgan('dev')); //logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//api

import router from './api/api.js';
import notFound from './middleware/404';
import errors from './middleware/error';

app.use(router);
app.use(notFound);
app.use(errors);

module.exports = app;

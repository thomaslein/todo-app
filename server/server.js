'use strict';

const express = require('express');
const logger = require('morgan');

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const app = express();

const mongoose = require('mongoose');

const Todo = require('./model/model');

const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eggs_todo_2017');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/routes');
routes(app);

app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

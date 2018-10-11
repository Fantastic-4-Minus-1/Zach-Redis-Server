require('newrelic');
const express = require('express');
const { cache } = require('./redis');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
// const logger = require('morgan');
const routes = require('../routes');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger('dev'));

app.use('/:company', express.static('public'));

app.use('/graph', cache, routes);

app.use('/api/graph', cache, routes);

const PORT = 3006;

app.listen(PORT, err =>
  console.log(err || `Now listening on port ${PORT}  🤓 👨🏽‍💻`)
);
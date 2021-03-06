require("dotenv").config()
require("./config/mongo")

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Configuring Cors 
 */
app.use(
    cors({
      origin: "*",
      credentials: true, 
      optionsSuccessStatus: 200,
    })
  );

app.use('/', usersRouter);

module.exports = app;

const express = require('express');
const path = require('path');
const helmet = require('helmet'); // sets some http header for security
const flash = require('connect-flash');
const mongoose = require('mongoose'); // mongoose for mongodb
const morgan = require('morgan'); // log requests to the console
const bodyParser = require('body-parser'); // pull information from HTML POST
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PythonShell = require('python-shell')
const methodOverride = require('method-override'); // simulate DELETE and PUT
const argv = require('optimist').argv;
const cycle = require('cycle');
var stringify = require('json-stringify-safe');

const configureServer = (app, passport) => {
  const options = {
    scriptPath: path.resolve(__dirname, '../python'),
  };
  var pyshell = new PythonShell('prototype_v05.py', options);


  // configuration
  mongoose.connect('mongodb://admin1:12345@ds125016.mlab.com:25016/music_db');

  // express session middleware
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(morgan('dev')); // log every request to the console
  app.use(helmet());
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('view engine', 'ejs'); // set up ejs for templating
  app.set('views', path.resolve(__dirname, '../client/views/pages')); // change default view directory

  // Serve static files with express static middleware function
  app.use('/controllers', express.static(path.resolve(__dirname, '../client/controllers')));

};

module.exports = configureServer;

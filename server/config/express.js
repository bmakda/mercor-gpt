const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const async = require('async');

function parallel(middlewares) {
  // eslint-disable-next-line func-names
  return function (req, res, next) {
    async.each(
      middlewares,
      (mw, cb) => {
        mw(req, res, cb);
      },
      next,
    );
  };
}

module.exports = function () {
  app.use(
    parallel([
      express.static(path.join(__dirname, '../audio')),
      bodyParser.json({ limit: '50mb' }),
      bodyParser.urlencoded({ limit: '50mb', extended: true }),
    ]),
  );

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(express.static(path.join(__dirname, '../audio')));

  const whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200'];
  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  app.use(cors(corsOptionsDelegate));

  // eslint-disable-next-line global-require
  require('../app/route_api')(app);

  return app;
};
